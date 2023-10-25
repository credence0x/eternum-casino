import { FiltersPanel } from "../../../elements/FiltersPanel";
import { FilterButton } from "../../../elements/FilterButton";
import useRealmStore from "../../../hooks/store/useRealmStore";
import { useEffect, useMemo, useState } from "react";
import { getRealm } from "../../../utils/realms";
import { useDojo } from "../../../DojoContext";
import { ReactComponent as Map } from "../../../assets/icons/common/map.svg";
import dataCasinos from "../../..//data/casinos.json";

import { FeedCasinoPopup } from "./FeedCasino";
import useUIStore from "../../../hooks/store/useUIStore";
import Button from "../../../elements/Button";
import ProgressBar from "../../../elements/ProgressBar";
import { ResourceCost } from "../../../elements/ResourceCost";
import { useCasino } from "../../../hooks/helpers/useCasino";

type CasinoComponentProps = {};

export const CasinoComponent = ({ }: CasinoComponentProps) => {
  const [showFeedPopup, setShowFeedPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const moveCameraToTarget = useUIStore((state) => state.moveCameraToTarget);
  const { getCasino } = useCasino();

  const setCasinos = useUIStore((state) => state.setCasinos);
  const casinos = useUIStore((state) => state.casinos);

  const count = casinos.length;
  moveCameraToTarget(casinos[count - 1]?.uiPosition);

  const {
    account: { account },
    setup: {
      systemCalls: { casino_get_winner },
    },
  } = useDojo();


  // useEffect(() => {
  //   setCasinos(
  //     dataCasinos.map((casino, index) =>
  //       getCasino(index + 1, { x: casino.x, y: casino.y, z: casino.z }),
  //     )
  //   );
  // }, [casinos]);

  const updateCasino = () => {
    const count = 1;
    const newCasino = getCasino(count - 1, casinos[count - 1].uiPosition);
    casinos[count - 1] = newCasino;
    setCasinos([...casinos]);
  };

  const closeCasinoRoundAndPickWinner = async () => {
    setIsLoading(true);
    await casino_get_winner({
      signer: account,
      casino_id: casinos[count - 1].casinoId || 0,
    });
    updateCasino();
    setIsLoading(false);
    // onClose();
  };

  // {!isLoading && (
  //   <Button
  //     className="!px-[6px] !py-[2px] text-xxs ml-auto"
  //     disabled={!canGoToNextStep}
  //     isLoading={isLoading}
  //     onClick={() => {
  //       if (step == 3) {
  //         sendResourcesToCasino();
  //       } else {
  //         setStep(step + 1);
  //       }
  //     }}
  //     variant={canGoToNextStep ? "success" : "outline"}
  //   >
  //     {step == 3 ? "Send Caravan" : isComplete ? "Get Round Winner" : "Next Step"}
  //   </Button>
  // )}
  // {isLoading && (
  //   <Button
  //     isLoading={true}
  //     onClick={() => {}}
  //     variant="danger"
  //     className="ml-auto p-2 !h-4 text-xxs !rounded-md"
  //   >
  //     {" "}
  //     {}{" "}
  //   </Button>
  // )}
  return (
    <>
      {count && showFeedPopup && <FeedCasinoPopup onClose={() => setShowFeedPopup(false)} count={count} />}
      {count && casinos && (
        <div className="space-y-5 px-2 mb-4">
          <div className="text-xs text-gold"> </div>
          {/* center the next div */}
          <div className="flex justify-center">
            <div className="text-1xl text-gold">
              Casino Royale
            </div>


          </div>
          <div className="flex justify-center p-0 rounded-md text-xxs text-gray-gold">
            <div className="flex items-center">
              <div className=" text-gold flex ml-auto ">

                {!isLoading && casinos[count - 1]?.progress < 100 ? (
                  <Button
                    className="p-1 !h-4 text-xxs !rounded-md"
                    variant="outline"
                    onClick={() => {
                      moveCameraToTarget(casinos[count - 1]?.uiPosition as any);
                      setShowFeedPopup(true);
                    }}
                  >
                    Enter Round
                  </Button>
                ) : !isLoading ? (
                  <Button
                    className="p-1 !h-4 text-xxs !rounded-md"
                    variant="outline"
                    onClick={() => {
                      closeCasinoRoundAndPickWinner();
                    }}
                  >
                    GET WINNER
                  </Button>

                ) :
                  <Button
                    isLoading={true}
                    onClick={() => { }}
                    variant="danger"
                    className="ml-auto p-2 !h-4 text-xxs !rounded-md"
                  >
                    {" "}
                    { }{" "}
                  </Button>
                }

              </div>


            </div>

          </div>
          <div className="flex flex-col w-full mt-3">


            <div className="flex flex-col p-2 relative bottom-2 rounded-[10px] bg-black/60">
              <div className="mb-1 ml-1 italic text-light-pink text-xxs">Resources at Stake</div>
              <div className="grid grid-cols-4 gap-1">
                {casinos[count - 1]?.casinoCurrentRoundResources.map(({ resourceId, currentAmount }) => (
                  <ResourceCost
                    withTooltip
                    type="horizontal"
                    key={resourceId}
                    resourceId={resourceId}
                    amount={currentAmount}
                  />
                ))}
              </div>

            </div>

            <div className="flex flex-col p-2 relative bottom-0 rounded-[10px] bg-black/60">
              <div className="mb-1 ml-1 italic text-light-pink text-xxs">Resource needed to close round</div>
              <div className="grid grid-cols-4 gap-1">
                {casinos[count - 1]?.casinoCurrentRoundResources.map(({ resourceId, currentAmount, completeAmount }) => (
                  <ResourceCost
                    withTooltip
                    type="horizontal"
                    key={resourceId}
                    resourceId={resourceId}
                    amount={completeAmount - currentAmount}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
