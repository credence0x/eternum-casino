import { FiltersPanel } from "../../../elements/FiltersPanel";
import { FilterButton } from "../../../elements/FilterButton";
import { CasinosListItem } from "./CasinosListItem";
import useRealmStore from "../../../hooks/store/useRealmStore";
import { useMemo, useState } from "react";
import { getRealm } from "../../../utils/realms";
import { useDojo } from "../../../DojoContext";
import { FeedCasinoPopup } from "./FeedCasino";
import useUIStore from "../../../hooks/store/useUIStore";

type CasinosListComponentProps = {};

export const CasinosListComponent = ({}: CasinosListComponentProps) => {
  const [showFeedPopup, setShowFeedPopup] = useState(false);
  const moveCameraToTarget = useUIStore((state) => state.moveCameraToTarget);
  const casinos = useUIStore((state) => state.casinos);
  console.log({ casinos });

  const {
    account: { account },
  } = useDojo();

  const realmEntityIds = useRealmStore((state) => state.realmEntityIds);

  const chosenOrder = useMemo(
    () => (realmEntityIds.length > 0 ? getRealm(realmEntityIds[0].realmId).order : undefined),
    [account, realmEntityIds],
  );

  return (
    <>
      <FiltersPanel className="px-3 py-2">
        <FilterButton active={false}>Filter</FilterButton>
      </FiltersPanel>
      {chosenOrder && showFeedPopup && <FeedCasinoPopup onClose={() => setShowFeedPopup(false)} order={chosenOrder} />}
      {chosenOrder && casinos && (
        <div className="space-y-2 px-2 mb-2">
          <div className="text-xs text-gold">Casino of your order: </div>
          <CasinosListItem
            casino={casinos[chosenOrder - 1]}
            order={chosenOrder}
            coords={casinos[chosenOrder - 1]?.uiPosition}
            onFeed={() => {
              moveCameraToTarget(casinos[chosenOrder - 1]?.uiPosition as any);
              setShowFeedPopup(true);
            }}
          />
        </div>
      )}
      <div className="flex flex-col space-y-2 px-2 mb-2">
        <div className="text-xs text-gold">Other Casinos: </div>
        {casinos.map((casino, i) =>
          chosenOrder && i + 1 !== chosenOrder ? (
            <CasinosListItem key={i} casino={casino} order={i + 1} coords={casino?.uiPosition as any} />
          ) : null,
        )}
      </div>
    </>
  );
};
