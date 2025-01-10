import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TierTable from "@/components/Tables/TierTable";

const SubscriptionTiers = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Subscription Tiers" />

            <div className="flex flex-col gap-10">
                <TierTable />
            </div>
        </DefaultLayout>
    );
};

export default SubscriptionTiers;
