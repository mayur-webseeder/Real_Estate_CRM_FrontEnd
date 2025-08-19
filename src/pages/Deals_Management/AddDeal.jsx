import { useParams } from "react-router";
import DealFormModel from "./components/DealFormModel";
import useDealsService from "../../services/useDealsService";
import { useSelector } from "react-redux";

function AddDeal() {
  const { leadId, propertyId } = useParams();
  const { isDealSubmiting } = useSelector((state) => state.deals);
  const { createDeal } = useDealsService();

  const handelSubmit = (data) => {
    createDeal(data);
  };
  return (
    <DealFormModel
      leadId={leadId}
      propertyId={propertyId}
      onSubmit={handelSubmit}
      isSubmitting={isDealSubmiting}
    />
  );
}

export default AddDeal;
