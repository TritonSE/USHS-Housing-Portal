// import { UnitModel } from "@/models/units";

// export const createUnit: RequestHandler = async (req, res, next) => {
//   const {
//     approved,
//     landlordFirstName,
//     landlordLastName,
//     landlordEmail,
//     landlordPhone,
//     monthlyRent,
//     securityDeposit,
//     paymentRentingCriteria,
//     applicationFeeCost,
//     housingAuthority,
//     holdingFeeAmount,
//     listingAddress,
//     sqft,
//     dateAvailable,
//     availableNow,
//     numBeds,
//     numBaths,
//     appliances,
//     communityFeatures,
//     parking,
//     accessibility,
//     pets,
//     sharingAcceptable,
//     landlordComments,
//   } = req.body;

//   res.status(201).json(unit);

//   try {
//     const unit = await UnitModel.create({
//       approved,
//       landlordFirstName,
//       landlordLastName,
//       landlordEmail,
//       landlordPhone,
//       monthlyRent,
//       securityDeposit,
//       paymentRentingCriteria,
//       applicationFeeCost,
//       housingAuthority,
//       holdingFeeAmount,
//       listingAddress,
//       sqft,
//       dateAvailable,
//       availableNow,
//       numBeds,
//       numBaths,
//       appliances,
//       communityFeatures,
//       parking,
//       accessibility,
//       pets,
//       sharingAcceptable,
//       landlordComments,
//     });
//     res.status(201).json(unit);
//   } catch (error) {
//     next(error);
//   }
// };
