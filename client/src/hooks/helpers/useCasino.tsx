import { Has, HasValue, getComponentValue, runQuery } from "@latticexyz/recs";
import { useDojo } from "../../DojoContext";
import { Position, UIPosition } from "../../types";
import casinoData from "../../data/casinos.json";
import { getContractPositionFromRealPosition, getEntityIdFromKeys } from "../../utils/utils";

export interface CasinoInterface {
  casinoId: number;
  orderId: number;
  currentRoundId: number;
  progress: number;
  casinoCurrentRoundResources: {
    resourceId: number;
    currentAmount: number;
    completeAmount: number;
  }[];
  minimumDepositResources: {
    resourceId: number;
    amount: number;
  }[];
  position: Position;
  uiPosition: UIPosition;
}

export const useCasino = () => {
  const {
    setup: {
      components: { CasinoMetaData, Resource, Position, CasinoRound },
    },
  } = useDojo();

  const getCasinoRoundWinner = (casinoId: number, roundId: number) => {
    let casinoRound = getComponentValue(CasinoRound, getEntityIdFromKeys([BigInt(casinoId), BigInt(roundId)]));

    return casinoRound.winner_id;
  };

  const getCasino = (orderId: number, uiPosition: UIPosition): CasinoInterface | undefined => {
    const position = getContractPositionFromRealPosition({ x: uiPosition.x, y: uiPosition.z });
    const casinId = runQuery([Has(CasinoMetaData), HasValue(Position, { x: position.x, y: position.y })]);

    if (casinId.size > 0) {
      let casinoId = Array.from(casinId)[0];
      if (orderId == 1) {
        // other things exists on the same position for some reason
        casinoId = Array.from(casinId)[Array.from(casinId).length - 1];
      }

      let casino = getComponentValue(CasinoMetaData, casinoId);
      console.log({ casino });

      if (casino) {
        let casinoCurrentRoundResources: { resourceId: number; currentAmount: number; completeAmount: number }[] = [];
        casinoData[orderId - 1].resources.minimum_completion.forEach((resource) => {
          let casinoRoundResource = getComponentValue(
            Resource,
            getEntityIdFromKeys([BigInt(casino.current_round_id), BigInt(resource.resourceType)]),
          );
          casinoCurrentRoundResources.push({
            resourceId: resource.resourceType,
            currentAmount: Math.min(casinoRoundResource?.balance ?? 0, resource.amount),
            completeAmount: resource.amount,
          });
        });

        // calculate casino round progress
        let totCurrentAmount = 0;
        let totCompleteAmount = 0;
        casinoCurrentRoundResources.forEach((resource) => {
          totCurrentAmount += Math.min(resource.currentAmount, resource.completeAmount);
          totCompleteAmount += resource.completeAmount;
        });
        let progress = (totCurrentAmount / totCompleteAmount) * 100;

        return {
          casinoId,
          orderId,
          currentRoundId: casino.current_round_id,
          progress,
          casinoCurrentRoundResources,
          minimumDepositResources: casinoData[orderId - 1].resources.minimum_deposit.map((resource) => {
            return {
              resourceId: resource.resourceType, // Fixed: changed semicolon to comma
              amount: resource.amount,
            };
          }),
          position,
          uiPosition,
        };
      }
    }
  };

  return {
    getCasino,
    getCasinoRoundWinner,
  };
};

// export const getCasinoRoundWinner = (casinoId, roundId) => {
//   const {
//     setup: {
//       components: { CasinoRound },
//     },
//   } = useDojo();

//   let casinoRound = getComponentValue(CasinoRound, getEntityIdFromKeys([BigInt(casinoId), BigInt(roundId)]));

//   return casinoRound.winner_id;
// };
