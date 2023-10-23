import { useEffect, useMemo, useState } from "react";
import { SecondaryPopup } from "../../../elements/SecondaryPopup";
import Button from "../../../elements/Button";
import { SelectCaravanPanel } from "../../cityview/realm/trade/CreateOffer";
import useRealmStore from "../../../hooks/store/useRealmStore";
import { getRealm } from "../../../utils/realms";
import { getComponentValue } from "@latticexyz/recs";
import {
  divideByPrecision,
  getContractPositionFromRealPosition,
  getEntityIdFromKeys,
  
} from "../../../utils/utils";
import { useDojo } from "../../../DojoContext";
import { Steps } from "../../../elements/Steps";
import { Headline } from "../../../elements/Headline";
import { OrderIcon } from "../../../elements/OrderIcon";
import { orderNameDict, orders } from "@bibliothecadao/eternum";
import { ResourceCost } from "../../../elements/ResourceCost";
import clsx from "clsx";
import { CasinoInterface, getCasinoRoundWinner, useCasino } from "../../../hooks/helpers/useCasino";
import { Tabs } from "../../../elements/tab";
import ProgressBar from "../../../elements/ProgressBar";
import { CasinoCaravansPanel } from "./CasinoCaravans/CasinoCaravansPanel";
import casinos from "../../../data/casinos.json";
import { useGetPositionCaravans } from "../../../hooks/helpers/useCaravans";
import { WEIGHT_PER_DONKEY_KG } from "@bibliothecadao/eternum";
import { ReactComponent as CloseIcon } from "../../../assets/icons/common/cross-circle.svg";
import useUIStore from "../../../hooks/store/useUIStore";

type FeedCasinoPopupProps = {
  onClose: () => void;
  order: number;
};

export const FeedCasinoPopup = ({ onClose, order }: FeedCasinoPopupProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const setTooltip = useUIStore((state) => state.setTooltip);

  const casinoPosition = useMemo(() => {
    const { x, z } = casinos[order - 1];
    return getContractPositionFromRealPosition({ x, y: z });
  }, [order]);

  const { getCasino } = useCasino();
  const casinoData = getCasino(order, {
    x: casinos[order - 1].x,
    y: casinos[order - 1].y,
    z: casinos[order - 1].z,
  });

  const { caravans } = useGetPositionCaravans(casinoPosition.x, casinoPosition.y);

  const tabs = useMemo(
    () => [
      {
        key: "all",
        label: (
          <div
            onMouseEnter={() =>
              setTooltip({
                position: "bottom",
                content: (
                  <>
                    <p className="whitespace-nowrap">Take a risk and succeed.</p>
                  </>
                ),
              })
            }
            onMouseLeave={() => setTooltip(null)}
            className="flex relative group flex-col items-center"
          >
            <div>Travel to Casino</div>
          </div>
        ),
        component: (
          <SendResourcesToCasinoPanel
            order={order}
            onSendCaravan={() => setSelectedTab(1)}
            onClose={onClose}
            casinoData={casinoData}
          />
        ),
      },
      {
        key: "my",
        label: (
          // TODO: implement incoming caravans here
          <div
            onMouseEnter={() =>
              setTooltip({
                position: "bottom",
                content: (
                  <>
                    <p className="whitespace-nowrap">Watch incoming caravans.</p>
                    <p className="whitespace-nowrap">Pass resources to Casino on arriving.</p>
                  </>
                ),
              })
            }
            onMouseLeave={() => setTooltip(null)}
            className="flex group relative flex-col items-center"
          >
            <div>{`Caravans at Casino (${caravans.length})`}</div>
          </div>
        ),
        component: casinoData ? (
          <CasinoCaravansPanel caravans={caravans} casinoData={casinoData} />
        ) : (
          <></>
        ),
      },
    ],
    [selectedTab, caravans],
  );

  return (
    <SecondaryPopup name="casino">
      <SecondaryPopup.Head>
        <div className="flex items-center space-x-1">
          <div className="mr-0.5 bg-gray">Manage Casino:</div>
          <CloseIcon className="w-3 h-3 cursor-pointer fill-white" onClick={onClose} />
        </div>
      </SecondaryPopup.Head>
      <SecondaryPopup.Body width={"460px"}>
        <Tabs
          selectedIndex={selectedTab}
          onChange={(index: any) => setSelectedTab(index)}
          variant="default"
          className="h-full"
        >
          <Tabs.List className="!border-t-transparent">
            {tabs.map((tab, index) => (
              <Tabs.Tab key={index}>{tab.label}</Tabs.Tab>
            ))}
          </Tabs.List>
          <Tabs.Panels className="overflow-hidden">
            {tabs.map((tab, index) => (
              <Tabs.Panel key={index}>{tab.component}</Tabs.Panel>
            ))}
          </Tabs.Panels>
        </Tabs>
      </SecondaryPopup.Body>
    </SecondaryPopup>
  );
};

const SelectableRealm = ({ realm, selected = false, onClick, costs, ...props }: any) => {
  const costById = useMemo(() => {
    const costById: any = {};
    costs &&
      costs.forEach((cost: any) => {
        costById[cost.resourceId] = cost.amount;
      });
    return costById;
  }, [costs]);

  const canInitialize = useMemo(() => {
    let canInitialize = true;
    if (!realm || !realm.resources) {
      return false;
    }
    realm.resources.forEach((resource: any) => {
      if (resource.balance < costById[resource.id]) {
        canInitialize = false;
      }
    });
    return canInitialize;
  }, [costById, realm.resources]);

  return (
    <div
      className={clsx(
        "flex flex-col relative items-center p-2 border rounded-md text-xxs text-gray-gold",
        "border-gray-gold",
      )}
      {...props}
    >
      {realm && (
        <div className="flex absolute items-center p-1 top-0 left-0 border border-t-0 border-l-0 rounded-br-md border-gray-gold">
          {realm.order && <OrderIcon order={orderNameDict[realm.order]} size="xs" className="mr-1" />}
          {realm.name}
        </div>
      )}
      <div className="text-gold ml-auto absolute right-2 top-2">24h:10m away</div>
      <div className="flex items-center mt-6 w-full">
        <div className="flex">
          { realm.resources &&
            realm.resources.map((resource: any) => {
              return (
                <ResourceCost
                  type="vertical"
                  withTooltip
                  key={resource.id}
                  resourceId={resource.id}
                  amount={resource?.balance}
                  color={resource.balance >= costById[resource.id] ? "" : "text-order-giants"}
                />
              );
            })}
        </div>
        <Button
          disabled={!canInitialize}
          onClick={onClick}
          className="h-6 text-xxs ml-auto"
          variant="success"
        >
          Select Realm
        </Button>
      </div>
    </div>
  );
};

const SendResourcesToCasinoPanel = ({
  order,
  onClose,
  onSendCaravan,
  casinoData,
}: {
  order: number;
  onClose: () => void;
  onSendCaravan: () => void;
  casinoData: CasinoInterface | undefined;
}) => {
  const [selectedCaravan, setSelectedCaravan] = useState<number>(0);
  const [isNewCaravan, setIsNewCaravan] = useState(false);
  const [donkeysCount, setDonkeysCount] = useState(1);
  const [hasEnoughDonkeys, setHasEnoughDonkeys] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const {
    account: { account },
    setup: {
      systemCalls: { casino_get_winner, send_resources_to_destination },
    },
  } = useDojo();

  const closeCasinoRoundAndPickWinner = async () => {
    setIsLoading(true);
    await casino_get_winner({ 
      signer: account, 
      casino_id: casinoData?.casinoId || 0,
    });    
    onClose();
  };

  const sendResourcesToCasino = async () => {
    setIsLoading(true);
    if (casinoData) {
      const resourcesList = casinoData?.minimumDepositResources.flatMap((resource) => [resource.resourceId, resource.amount]);
      if (isNewCaravan) {
        await send_resources_to_destination({
          signer: account,
          sending_entity_id: realmEntityId,
          resources: resourcesList || [],
          destination_coord_x: casinoData.position.x,
          destination_coord_y: casinoData.position.y,
          donkeys_quantity: donkeysCount,
        });
      } else {
        // transfer resources to caravan
        await send_resources_to_destination({
          signer: account,
          sending_entity_id: realmEntityId,
          resources: resourcesList || [],
          destination_coord_x: casinoData.position.x,
          destination_coord_y: casinoData.position.y,
          caravan_id: selectedCaravan,
        });
      }
    }
    onSendCaravan();
  };

  const {
    setup: {
      components: { Resource },
    },
  } = useDojo();

  const realmEntityIds = useRealmStore((state) => state.realmEntityIds);
  const realmEntityId = useRealmStore((state) => state.realmEntityId);
  const setRealmEntityId = useRealmStore((state) => state.setRealmEntityId);

  const isComplete = casinoData && casinoData?.progress >= 100;

  // TODO: use same precision everywhere
  const resourceWeight = useMemo(() => {
    let _resourceWeight = 0;
    for (const [_, amount] of Object.entries(
      casinoData?.minimumDepositResources.map((resource) => resource.amount) || {},
    )) {
      _resourceWeight += amount * 1;
    }
    
    return _resourceWeight;
  }, [casinoData]);


  const minDepositResourceIds = useMemo(() => {
    return casinoData?.minimumDepositResources.map((resource) => resource.resourceId) || [];
  }, [casinoData]);

  const minDepositResourceAmounts = useMemo(() => {
    const amounts: any = {};
    casinoData?.minimumDepositResources.forEach((resource) => {
      amounts[resource.resourceId] = divideByPrecision(resource.amount);
    });
    return amounts;
  }, [casinoData]);


  const realms = useMemo(
    () =>
      realmEntityIds.map((realmEntityId) => {
        const _realm = getRealm(realmEntityId.realmId);
        const _resources = casinoData?.minimumDepositResources.map((resource) => ({
          id: resource.resourceId,
          balance:
            getComponentValue(
              Resource,
              getEntityIdFromKeys([BigInt(realmEntityId.realmEntityId), BigInt(resource.resourceId)]),
            )?.balance || 0,
        }));
        return { ..._realm, entity_id: realmEntityId.realmEntityId, resources: _resources };
      }),
    [realmEntityIds],
  );

  const canGoToNextStep = useMemo(() => {
    if (step === 3) {
      return selectedCaravan !== 0 || (hasEnoughDonkeys && isNewCaravan);
    } else if (step == 2) {
      return false;
    } else {
      return true;
    }
  }, [step, selectedCaravan, hasEnoughDonkeys, isNewCaravan]);

  useEffect(() => {
    if (donkeysCount * WEIGHT_PER_DONKEY_KG >= divideByPrecision(resourceWeight)) {
      setHasEnoughDonkeys(true);
    } else {
      setHasEnoughDonkeys(false);
    }
  }, [donkeysCount, resourceWeight]);

  return (
    <div className="flex flex-col items-center p-2">
      <div className="flex flex-col space-y-2 text-xs w-full mb-3">
        <div className="flex justify-between">
          <div className="flex items-center">
            {<OrderIcon order={orderNameDict[order]} size="xs" className="mx-1" />}
            <span className="text-white font-bold">{orders[order - 1].fullOrderName}</span>
          </div>
          <div className="flex flex-col text-xxs text-right">
            <span className="text-gray-gold italic">State</span>
            <span
              className={clsx("text-gold")}
            > GAMBLE YOUR LIFE AWAY 
            </span>
          </div>
        </div>
        <ProgressBar rounded progress={casinoData?.progress || 0} className="bg-gold" />
      </div>
      {step == 1 && (
        <>
          <div className="flex flex-col space-y-2 text-xs">
            <div className="relative w-full">
              <img src={`/images/buildings/casino.webp`} className="object-cover w-full h-full rounded-[10px]" />
              <div className="flex flex-col p-2 absolute left-2 bottom-2 rounded-[10px] bg-black/60">
                <div className="mb-1 ml-1 italic text-light-pink text-xxs">
                  "Minimum Deposit:" 
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {casinoData?.minimumDepositResources.map(({ resourceId, amount }) => (
                        <ResourceCost
                          withTooltip
                          type="vertical"
                          key={resourceId}
                          resourceId={resourceId}
                          amount={amount}
                        />
                      ))
                    }
                    
                </div>
              </div>
            </div>
            <Headline size="big">
              Send caravan to Casino- Step {step}
            </Headline>
            <div className="text-xxs mb-2 italic text-gold">
              To gamble at the Casino you need to send a caravan with minumum resources deposit to the Casino location.
            </div>

            <div className="text-xxs mb-2 italic text-white">{`Click the "Next" button to select a Realm from which you want to spend resources.`}</div>
          </div>
        </>
      )}
      {step == 2 && (
        <div className="flex flex-col w-full space-y-2">
          <Headline size="big">Select Realm - Step {step}</Headline>
          <div className="text-xxs mb-2 italic text-gold">
            Press "Set the amounts" on any Realm with required resources, to set amounts and send caravan to Casino.
            
          </div>
          {realms.map((realm) => (
            <SelectableRealm
              key={realm.realm_id}
              realm={realm}
              onClick={() => {
                setRealmEntityId(realm.entity_id);
                setStep(step + 1);
              }}
              costs={casinoData?.minimumDepositResources}
              selected={realmEntityId === realm.entity_id}
            />
          ))}
        </div>
      )}
      {step == 3 && (
        <>
          <SelectCaravanPanel
            className="!p-0"
            donkeysCount={donkeysCount}
            setDonkeysCount={setDonkeysCount}
            isNewCaravan={isNewCaravan}
            setIsNewCaravan={setIsNewCaravan}
            selectedCaravan={selectedCaravan}
            setSelectedCaravan={setSelectedCaravan}
            selectedResourceIdsGet={[]}
            selectedResourcesGetAmounts={[]}
            selectedResourceIdsGive={minDepositResourceIds}
            selectedResourcesGiveAmounts={minDepositResourceAmounts}
            resourceWeight={resourceWeight}
            hasEnoughDonkeys={hasEnoughDonkeys}
            headline="Select Caravan - Step 3"
          />
        </>
      )}
      <div className="flex justify-between items-center mt-3 w-full text-xxs">
        <Button
          className="!px-[6px] !py-[2px] text-xxs"
          onClick={() => (step === 1 ? onClose() : setStep(step - 1))}
          variant="outline"
        >
          {step === 1 ? "Cancel" : "Back"}
        </Button>
        <Steps className="absolute -translate-x-1/2 left-1/2 bottom-3" step={step} maxStep={3} />
        {!isLoading && (
          <Button
            className="!px-[6px] !py-[2px] text-xxs ml-auto"
            disabled={!canGoToNextStep}
            isLoading={isLoading}
            onClick={() => {
              if (step == 3) {
                sendResourcesToCasino();
              } else {
                if (isComplete){
                  closeCasinoRoundAndPickWinner()

                  let winnerEntityId = getCasinoRoundWinner(
                    casinoData?.casinoId || 0,
                    casinoData.currentRoundId
                  )
                  alert(`Winner is ${winnerEntityId}`)

                } else {
                  setStep(step + 1);
                }
              }
            }}
            variant={canGoToNextStep ? "success" : "outline"}
          >
            {step == 3 ? "Send Caravan" : isComplete ? "Get Round Winner" : "Next Step"}
          </Button>
        )}
        {isLoading && (
          <Button
            isLoading={true}
            onClick={() => {}}
            variant="danger"
            className="ml-auto p-2 !h-4 text-xxs !rounded-md"
          >
            {" "}
            {}{" "}
          </Button>
        )}
      </div>
    </div>
  );
};
