import { createContext, useContext, useReducer } from 'react';

const CalcContext = createContext();

const initialState = {
  critStat: 0, swiftnessStat: 0,
  banquetSpeed: '5', backAttack: false, hasSupporter: true, partySynergy: 'none',

  classCritRate: 0, classCritDmg: 0, classAtkSpeed: 0, classMoveSpeed: 0,

  weaponQuality: 0,
  necklaceOption: 'none',
  ring1CritRate: 'none', ring1CritDmg: 'none',
  ring2CritRate: 'none', ring2CritDmg: 'none',
  bracelet1: 'none', bracelet2: 'none', bracelet3: 'none',

  raidCaptainGrade: 'none', raidCaptainStone: 0,
  keenBluntGrade: 'none', keenBluntStone: 0,
  adrenalineGrade: 'none', massIncrease: false,

  evo2EndlessMana: 0, evo2ForbiddenSpell: 0, evo2KeenSense: 0,
  evo2LimitBreak: 0, evo2OptTraining: 0, evo2BlessedGoddess: 0,
  evo3InfinitePower: 0, evo3AllOutStrike: 0, evo3OneShot: 0,
  evo3DestructionTank: 0, evo3TimingDomination: 0, evo3PassionateDance: 0,
  evo4Hoesim: 0, evo4Dalin: 0, evo4Bunswae: 0,
  evo4Seongakja: 0, evo4Jingun: 0, evo4Giwon: 0,
  evo5Munga: 0, evo5Eumdol: 0, evo5Infighting: 0,
  evo5StandStriker: 0, evo5ManaFurnace: 0, evo5StableManager: 0,
};

function calcReducer(state, action) {
  if (action.type === 'SET_FIELD') {
    return { ...state, [action.field]: action.value };
  }
  return state;
}

export function CalcProvider({ children }) {
  const [state, dispatch] = useReducer(calcReducer, initialState);
  const setField = (field, value) => dispatch({ type: 'SET_FIELD', field, value });

  return (
    <CalcContext.Provider value={{ state, setField }}>
      {children}
    </CalcContext.Provider>
  );
}

export function useCalc() {
  return useContext(CalcContext);
}
