/* Autogenerated file. Do not edit manually. */

import { defineComponent, Type as RecsType, World } from "@latticexyz/recs";

export function defineContractComponents(world: World) {
  return {
    WorldConfig: (() => {
      const name = "WorldConfig";
      return defineComponent(
        world,
        {
          realm_l2_contract: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    LaborConfig: (() => {
      const name = "LaborConfig";
      return defineComponent(
        world,
        {
          base_labor_units: RecsType.Number,
          base_resources_per_cycle: RecsType.Number,
          base_food_per_cycle: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    TravelConfig: (() => {
      const name = "TravelConfig";
      return defineComponent(
        world,
        {
          free_transport_per_city: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    BuildingConfig: (() => {
      const name = "BuildingConfig";
      return defineComponent(
        world,
        {
          base_sqm: RecsType.Number,
          workhut_cost: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    BuildingCost: (() => {
      const name = "BuildingCost";
      return defineComponent(
        world,
        {
          resource_type: RecsType.Number,
          cost: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    BuildingTypeConfig: (() => {
      const name = "BuildingTypeConfig";
      return defineComponent(
        world,
        {
          id: RecsType.Number,
          sqm: RecsType.Number,
          resource_types_packed: RecsType.NumberArray,
          resource_types_count: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    LaborCostResources: (() => {
      const name = "LaborCostResources";
      return defineComponent(
        world,
        {
          resource_types_packed: RecsType.Number,
          resource_types_count: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    LaborCostAmount: (() => {
      const name = "LaborCostAmount";
      return defineComponent(
        world,
        {
          value: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    CapacityConfig: (() => {
      const name = "CapacityConfig";
      return defineComponent(
        world,
        {
          entity_type: RecsType.Number,
          weight_gram: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    SpeedConfig: (() => {
      const name = "SpeedConfig";
      return defineComponent(
        world,
        {
          entity_type: RecsType.Number,
          sec_per_km: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    WeightConfig: (() => {
      const name = "WeightConfig";
      return defineComponent(
        world,
        {
          entity_type: RecsType.Number,
          weight_gram: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Age: (() => {
      const name = "Age";
      return defineComponent(
        world,
        {
          born_at: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Position: (() => {
      const name = "Position";
      return defineComponent(
        world,
        {
          x: RecsType.Number,
          y: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    HomePosition: (() => {
      const name = "HomePosition";
      return defineComponent(
        world,
        {
          x: RecsType.Number,
          y: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Realm: (() => {
      const name = "Realm";
      return defineComponent(
        world,
        {
          realm_id: RecsType.Number,
          resource_types_packed: RecsType.Number,
          resource_types_count: RecsType.Number,
          cities: RecsType.Number,
          harbors: RecsType.Number,
          rivers: RecsType.Number,
          regions: RecsType.Number,
          wonder: RecsType.Number,
          order: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Resource: (() => {
      const name = "Resource";
      return defineComponent(
        world,
        {
          balance: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    OrderResource: (() => {
      const name = "OrderResource";
      return defineComponent(
        world,
        {
          resource_type: RecsType.Number,
          balance: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Vault: (() => {
      const name = "Vault";
      return defineComponent(
        world,
        {
          balance: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Labor: (() => {
      const name = "Labor";
      return defineComponent(
        world,
        {
          balance: RecsType.Number,
          last_harvest: RecsType.Number,
          multiplier: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Owner: (() => {
      const name = "Owner";
      return defineComponent(
        world,
        {
          address: RecsType.String,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Capacity: (() => {
      const name = "Capacity";
      return defineComponent(
        world,
        {
          weight_gram: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Movable: (() => {
      const name = "Movable";
      return defineComponent(
        world,
        {
          sec_per_km: RecsType.Number,
          blocked: RecsType.Boolean,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    ArrivalTime: (() => {
      const name = "ArrivalTime";
      return defineComponent(
        world,
        {
          arrives_at: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Quantity: (() => {
      const name = "Quantity";
      return defineComponent(
        world,
        {
          value: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    QuantityTracker: (() => {
      const name = "QuantityTracker";
      return defineComponent(
        world,
        {
          count: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    EntityMetadata: (() => {
      const name = "EntityMetadata";
      return defineComponent(
        world,
        {
          entity_type: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    ForeignKey: (() => {
      const name = "ForeignKey";
      return defineComponent(
        world,
        {
          entity_id: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Caravan: (() => {
      const name = "Caravan";
      return defineComponent(
        world,
        {
          caravan_id: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    CaravanMembers: (() => {
      const name = "CaravanMembers";
      return defineComponent(
        world,
        {
          key: RecsType.Number,
          count: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Trade: (() => {
      const name = "Trade";
      return defineComponent(
        world,
        {
          maker_id: RecsType.Number,
          taker_id: RecsType.Number,
          maker_order_id: RecsType.Number,
          taker_order_id: RecsType.Number,
          expires_at: RecsType.Number,
          claimed_by_maker: RecsType.Boolean,
          claimed_by_taker: RecsType.Boolean,
          taker_needs_caravan: RecsType.Boolean,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Status: (() => {
      const name = "Status";
      return defineComponent(
        world,
        {
          value: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    FungibleEntities: (() => {
      const name = "FungibleEntities";
      return defineComponent(
        world,
        {
          key: RecsType.Number,
          count: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    OrderId: (() => {
      const name = "OrderId";
      return defineComponent(
        world,
        {
          id: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Road: (() => {
      const name = "Road";
      return defineComponent(
        world,
        {
          start_coord_x: RecsType.Number,
          start_coord_y: RecsType.Number,
          end_coord_x: RecsType.Number,
          end_coord_y: RecsType.Number,
          usage_count: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    ResourceCost: (() => {
      const name = "ResourceCost";
      return defineComponent(
        world,
        {
          resource_type: RecsType.Number,
          amount: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    HyperStructure: (() => {
      const name = "HyperStructure";
      return defineComponent(
        world,
        {
          hyperstructure_type: RecsType.Number,
          initialization_resource_id: RecsType.Number,
          initialization_resource_count: RecsType.Number,
          construction_resource_id: RecsType.Number,
          construction_resource_count: RecsType.Number,
          initialized_at: RecsType.Number,
          completed_at: RecsType.Number,
          coord_x: RecsType.Number,
          coord_y: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    LaborAuction: (() => {
      const name = "LaborAuction";
      return defineComponent(
        world,
        {
          zone: RecsType.Number,
          decay_constant_mag: RecsType.Number,
          decay_constant_sign: RecsType.Boolean,
          per_time_unit: RecsType.Number,
          start_time: RecsType.Number,
          sold: RecsType.Number,
          price_update_interval: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    Casino: (() => {
      const name = "Casino";
      return defineComponent(
        world,
        {
          current_round_id: RecsType.Number,
          total_rounds_played: RecsType.Number,
          min_deposit_resource_cost_id: RecsType.Number,
          min_deposit_resource_count: RecsType.Number,
          min_closing_resource_cost_id: RecsType.Number,
          min_closing_resource_count: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    CasinoRound: (() => {
      const name = "CasinoRound";
      return defineComponent(
        world,
        {
          round_index: RecsType.Number,
          winner_id: RecsType.Number,
          participant_count: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
    CasinoRoundParticipant: (() => {
      const name = "CasinoRoundParticipant";
      return defineComponent(
        world,
        {
          participant_index: RecsType.Number,
          participant_id: RecsType.Number,
        },
        {
          metadata: {
            name: name,
          },
        },
      );
    })(),
  };
}
