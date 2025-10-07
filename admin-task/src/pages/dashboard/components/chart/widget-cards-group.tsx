  import WidgetCard from "./widget-card";

  export default function WidgetCardsGroup() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <WidgetCard
          title="Weekly sales"
          total={714000}
          percent={2.6}
          color="#1E88E5" 
          icon={<img src="/assets/card/ic-card-bag.svg" alt="sales" />}
          chartSeries={[22, 8, 35, 50, 82, 84, 77, 12]}
          categories={months}
        />

        <WidgetCard
          title="New users"
          total={1352831}
          percent={-0.1}
          color="#8E24AA" 
          icon={<img src="/assets/card/ic-card-users.svg" alt="users" />}
          chartSeries={[56, 47, 40, 62, 73, 30, 23, 54]}
          categories={months}
        />

        <WidgetCard
          title="Purchase orders"
          total={1723315}
          percent={2.8}
          color="#FBC02D" 
          icon={<img src="/assets/card/ic-card-buy.svg" alt="orders" />}
          chartSeries={[40, 70, 50, 28, 70, 75, 7, 64]}
          categories={months}
        />

        <WidgetCard
          title="Messages"
          total={234}
          percent={3.6}
          color="#E53935" 
          icon={<img src="/assets/card/ic-card-message.svg" alt="messages" />}
          chartSeries={[56, 30, 23, 54, 47, 40, 62, 73]}
          categories={months}
        />
      </div>
    );
  }
