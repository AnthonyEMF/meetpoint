import { create } from "zustand";
import { dashboardAsync } from "../../../shared/actions/dashboard/dashboard.action";

export const useDashboardStore = create((set) => ({
    dashboardData: {
        usersCount: 0,
        eventsCount: 0,
        attendancesCount: 0,
        commentsCount: 0,
        users: [],
        events: [],
        categories: [],
        reports: []
    },

    loadData: async () => {
        const result = await dashboardAsync();

        if (result.status) {
            set({dashboardData: result.data});
            return;
        }

        set({dashboardData: null});
        return;
    }
}));