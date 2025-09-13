import { useState, useCallback, useEffect } from 'react';
import { Lead, Opportunity, FilterState } from '../types';
import { mockLeads, initialOpportunities } from '../data/mockData';
import { simulateApiCall } from '../utils/helpers';
import { saveFilterState, loadFilterState } from '../utils/storage';

const initialFilterState: FilterState = {
  search: '',
  status: [],
  sortBy: 'score',
  sortDirection: 'desc',
};

export const useLeadsManager = () => {
  const ITEMS_PER_PAGE = 20;

  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [displayedLeads, setDisplayedLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [filterState, setFilterState] = useState<FilterState>(() => {
    return loadFilterState() || initialFilterState;
  });

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const data = await simulateApiCall(mockLeads);
      setAllLeads(data);
      setPage(1);
      setError(null);
    } catch (err) {
      setError('Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, []);

  const getFilteredAndSortedLeads = useCallback(() => {
    return allLeads
      .filter((lead) => {
        const matchesSearch =
          filterState.search === '' ||
          lead.name.toLowerCase().includes(filterState.search.toLowerCase()) ||
          lead.company.toLowerCase().includes(filterState.search.toLowerCase());

        const matchesStatus =
          filterState.status.length === 0 || filterState.status.includes(lead.status);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const direction = filterState.sortDirection === 'desc' ? -1 : 1;
        if (filterState.sortBy === 'score') {
          return (a.score - b.score) * direction;
        }
        return 0;
      });
  }, [allLeads, filterState]);

  useEffect(() => {
    const filteredLeads = getFilteredAndSortedLeads();
    const endIndex = page * ITEMS_PER_PAGE;
    setDisplayedLeads(filteredLeads.slice(0, endIndex));
  }, [page, getFilteredAndSortedLeads]);

  const loadMoreLeads = useCallback(() => {
    if (!loading) {
      setPage(prev => prev + 1);
    }
  }, [loading]);

  const updateLead = useCallback(async (leadId: string, updates: Partial<Lead>) => {
    try {
      const updatedLeads = allLeads.map((lead) =>
        lead.id === leadId ? { ...lead, ...updates } : lead
      );
      await simulateApiCall(updatedLeads);
      setAllLeads(updatedLeads);
      return true;
    } catch (err) {
      throw new Error('Failed to update lead');
    }
  }, [allLeads]);

  const convertToOpportunity = useCallback(async (lead: Lead, amount?: number) => {
    const newOpportunity: Opportunity = {
      id: `opp-${Date.now()}`,
      name: `${lead.company} Opportunity`,
      stage: 'discovery',
      amount,
      accountName: lead.company,
      createdAt: new Date().toISOString(),
      leadId: lead.id,
    };

    try {
      await simulateApiCall(newOpportunity);
      setOpportunities((prev) => [...prev, newOpportunity]);
      await updateLead(lead.id, { status: 'qualified' });
      return true;
    } catch (err) {
      throw new Error('Failed to convert lead to opportunity');
    }
  }, [updateLead]);

  const updateFilters = useCallback((updates: Partial<FilterState>) => {
    setFilterState((prev) => {
      const newState = { ...prev, ...updates };
      saveFilterState(newState);
      return newState;
    });
    setPage(1);
  }, []);

  const filteredLeads = getFilteredAndSortedLeads();
  const hasMore = filteredLeads.length > displayedLeads.length;

  return {
    leads: displayedLeads,
    opportunities,
    loading,
    error,
    filterState,
    fetchLeads,
    updateLead,
    convertToOpportunity,
    updateFilters,
    loadMoreLeads,
    hasMore,
    total: filteredLeads.length
  };
};
