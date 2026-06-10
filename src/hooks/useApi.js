'use client';

import { useState, useCallback } from 'react';
import api from '@/lib/axios';

export default function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(url, { params, ...options });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      return null;
    } finally {
      setLoading(false);
    }
  }, [url]);

  const postData = useCallback(async (body, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(url, body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        ...config,
      });
      return response.data;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      return null;
    } finally {
      setLoading(false);
    }
  }, [url]);

  const submitFormData = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      return null;
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, error, fetchData, postData, submitFormData };
}
