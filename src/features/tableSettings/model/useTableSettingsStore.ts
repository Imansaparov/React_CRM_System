import { useLocalStorage } from '@/shared/lib/hooks/useLocalStorage';
import {
  GridFilterModel,
  GridSortModel,
  GridPaginationModel,
} from '@mui/x-data-grid';

export interface TableSettings {
  pagination: GridPaginationModel;
  sorting: GridSortModel;
  filtering: GridFilterModel;
}

const DEFAULT_SETTINGS: TableSettings = {
  pagination: { page: 0, pageSize: 5 },
  sorting: [],
  filtering: { items: [] },
};

export const useTableSettingsStore = (tableId: string) => {
  const storageKey = `tableSettings_${tableId}`;

  const [settings, setSettings] = useLocalStorage<TableSettings>(
    storageKey,
    DEFAULT_SETTINGS
  );

  const updatePagination = (model: GridPaginationModel) => {
    setSettings(prev => ({ ...prev, pagination: model }));
  };

  const updateSorting = (model: GridSortModel) => {
    setSettings(prev => ({ ...prev, sorting: model }));
  };

  const updateFiltering = (model: GridFilterModel) => {
    setSettings(prev => ({ ...prev, filtering: model }));
  };

  return {
    settings,
    updatePagination,
    updateSorting,
    updateFiltering,
  };
};
