import {
  BUS_CAPACITY,
  SANDWICHES_PER_PASSENGER,
  WATER_PER_PASSENGER,
} from './constants.js'

export const calculateBuses = passengers => Math.ceil(passengers / BUS_CAPACITY)

export const calculateWaterBottles = passengers =>
  passengers * WATER_PER_PASSENGER

export const calculateSandwiches = passengers =>
  passengers * SANDWICHES_PER_PASSENGER

export const calculateTripResources = passengers => ({
  passengers,
  buses: calculateBuses(passengers),
  water: calculateWaterBottles(passengers),
  sandwiches: calculateSandwiches(passengers),
})
