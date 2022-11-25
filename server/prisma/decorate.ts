import {
  ResolversEnhanceMap,
  applyResolversEnhanceMap,
} from '@generated/type-graphql';
import { Authorized } from 'type-graphql';

const resolversEnhanceMap: ResolversEnhanceMap = {
  User: {
    createManyUser: [Authorized(['admin'])],
    createOneUser: [Authorized(['admin'])],
    updateManyUser: [Authorized(['admin'])],
    updateOneUser: [Authorized(['admin'])],
    upsertOneUser: [Authorized(['admin'])],
    deleteManyUser: [Authorized(['admin'])],
    deleteOneUser: [Authorized(['admin'])],
  },
  Role: {
    createManyRole: [Authorized(['admin'])],
    createOneRole: [Authorized(['admin'])],
    updateManyRole: [Authorized(['admin'])],
    updateOneRole: [Authorized(['admin'])],
    upsertOneRole: [Authorized(['admin'])],
    deleteManyRole: [Authorized(['admin'])],
    deleteOneRole: [Authorized(['admin'])],
  },
  Unit: {
    createManyUnit: [Authorized(['admin'])],
    createOneUnit: [Authorized(['admin'])],
    updateManyUnit: [Authorized(['admin'])],
    updateOneUnit: [Authorized(['admin'])],
    upsertOneUnit: [Authorized(['admin'])],
    deleteManyUnit: [Authorized(['admin'])],
    deleteOneUnit: [Authorized(['admin'])],
  },
  Ingredient: {
    createManyIngredient: [Authorized(['admin'])],
    createOneIngredient: [Authorized(['admin'])],
    updateManyIngredient: [Authorized(['admin'])],
    updateOneIngredient: [Authorized(['admin'])],
    upsertOneIngredient: [Authorized(['admin'])],
    deleteManyIngredient: [Authorized(['admin'])],
    deleteOneIngredient: [Authorized(['admin'])],
  },
  Recipe: {
    _all: [Authorized(['user', 'admin'])],
  },
  RecipeIngredient: {
    _all: [Authorized(['user', 'admin'])],
  },
};

applyResolversEnhanceMap(resolversEnhanceMap);
