import { FiltersPanel } from "../../../elements/FiltersPanel";
import { FilterButton } from "../../../elements/FilterButton";
import useRealmStore from "../../../hooks/store/useRealmStore";
import { useEffect, useMemo, useState } from "react";
import { getRealm } from "../../../utils/realms";
import { useDojo } from "../../../DojoContext";
import { ReactComponent as Map } from "../../../assets/icons/common/map.svg";


import { FeedCasinoPopup } from "./FeedCasino";
import useUIStore from "../../../hooks/store/useUIStore";
import Button from "../../../elements/Button";
import { useCasino } from "../../../hooks/helpers/useCasino";

type CasinoWinnerComponentProps = {};

export const CasinoWinnerComponent = ({ }: CasinoWinnerComponentProps) => {
  const [showFeedPopup, setShowFeedPopup] = useState(false);
  const setCasinoRounds = useUIStore((state) => state.setCasinoRounds);
  const { getCasinoRounds } = useCasino();

  let realmEntityIds = useRealmStore((state) => state.realmEntityIds);
  let ownedRealms = realmEntityIds.map((x) => x.realmEntityId);

  console.log(realmEntityIds.map((x) => x.realmEntityId))
  console.log(realmEntityIds.map((x) => x.realmId))

  const casinoRounds = getCasinoRounds();
  setCasinoRounds(casinoRounds);

  const count = casinoRounds.length;

  return (
    <>
      {count && showFeedPopup && <FeedCasinoPopup onClose={() => setShowFeedPopup(false)} count={count} />}
      {count && casinoRounds && (
        <div className="space-y-5 px-2 mb-4">
          <div className="text-xs text-gold"> </div>
          {/* center the next div */}
          <div className="flex justify-center">
            <div className="text-1xl text-gold">
              Lucky Winners
            </div>


          </div>
          <div className="flex justify-center p-0 rounded-md text-xxs text-gray-gold">
            <div className="items-center">
              <br></br>
              {casinoRounds.map((round, i) =>
              (

                <div className=" text-gold text-xs flex ml-auto ">

                  <div className=" text-gold flex ml-auto ">
                    Round: {round.roundIndex + 1} &nbsp;
                    Winner: {
                      ownedRealms.includes(round.winnerId) ? "YOU" : "NOT YOU"
                    }
                    &nbsp;
                    Participants: {round.participantCount}&nbsp;&nbsp;&nbsp;&nbsp;
                    {(
                      <Button
                        className="p-1 !h-4 text-xxs !rounded-md"
                        variant="outline"
                        onClick={() => {
                          // transport empty caravan to casino
                        }}
                      >
                        Travel to Claim

                      </Button>
                    )}
                  </div>
                  <br></br>
                  <br></br>
                </div>


              ),
              )}

            </div>

          </div>
        </div>
      )}
    </>
  );
};
