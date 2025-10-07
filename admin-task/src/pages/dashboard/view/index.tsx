import Header from "@/components/header/components/header-section";
import WidgetCardsGroup from "../components/chart/widget-cards-group";
import CurrentVisitsChart from "../components/chart/current-visits-chart";
import WebsiteVisitsChart from "../components/chart/website-visits-chart";

export default function DashboardView() {
  return (
    <>
      <Header />
      <div className="p-6 space-y-6">
        <WidgetCardsGroup />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CurrentVisitsChart />
          </div>

          <div className="lg:col-span-2">
            <WebsiteVisitsChart />
          </div>
        </div>
      </div>
    </>
  );
}
