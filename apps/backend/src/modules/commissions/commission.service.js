import Commission from "./commission.model.js";

/*
 ENTERPRISE — Transaction Safe Commission Creation
 MUST be called inside a Mongo session
 */
export const createCommission = async (data, session) => {

  if (!session) {
    throw new Error(
      "createCommission must be used with a Mongo session"
    );
  }

  const {
    employeeId,
    orderId,
    items,
    vendor
  } = data;

  
   // Prevent duplicate commission
  
  const existing = await Commission.findOne({
    order: orderId
  }).session(session);

  if (existing) return existing;

  // Move this later to Settings collection
  const COMMISSION_PER_ITEM = 5;

  const itemsCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const commissionAmount =
    itemsCount * COMMISSION_PER_ITEM;

  const [commission] = await Commission.create([{
    employee: employeeId,
    order: orderId,
    amount: commissionAmount,
    itemsCount,
    vendor
  }], { session });

  return commission;
};

