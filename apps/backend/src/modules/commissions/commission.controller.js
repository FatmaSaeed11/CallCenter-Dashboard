import asyncHandler from "../../common/helpers/ah.js";
import Commission from "./commission.model.js";

/*
   Employee → see THEIR commissions
*/
export const myCommissions = asyncHandler(async (req, res) => {

  const commissions = await Commission.find({
    employee: req.user._id
  })
    .populate("order", "totalAmount status")
    .sort({ createdAt: -1 });

  res.json(commissions);
});

/*
   Admin → see ALL commissions
*/
export const allCommissions = asyncHandler(async (req, res) => {

  const commissions = await Commission.find()
    .populate("employee", "name email")
    .populate("order", "totalAmount")
    .sort({ createdAt: -1 });

  res.json(commissions);
});

/*
   Dashboard Summary
*/
export const commissionSummary = asyncHandler(async (req, res) => {

  const total = await Commission.aggregate([
    {
      $match: { status: { $ne: "REVERSED" } }
    },
    {
      $group: {
        _id: null,
        totalCommission: { $sum: "$amount" }
      }
    }
  ]);

  res.json({
    totalCommission: total[0]?.totalCommission || 0
  });
});
