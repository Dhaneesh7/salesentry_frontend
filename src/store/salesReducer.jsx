const initialState = {
  header: {
    vr_no: '',
    vr_date: '',
    ac_name: '',
    status: 'A',
    ac_amt: 0,
  },
  detail: [],
};

const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_HEADER':        // set/update header
      return {
        ...state,
        header: {
          ...state.header,
          ...action.payload,
        },
      };

    case 'ADD_DETAIL_ROW':           //add new row into detail table
      const sr_no = state.detail.length + 1;
      return {
        ...state,
        detail: [
          ...state.detail,
          {
            sr_no,
            item_code: '',
            item_name: '',
            description: '',
            qty: 0,
            rate: 0,
          },
        ],
      };

    case 'UPDATE_DETAIL_ROW':   //updating datas of the rows in detail form
      return {
        ...state,
        detail: state.detail.map((row, index) =>
          index === action.payload.index
            ? { ...row, [action.payload.field]: action.payload.value }
            : row
        ),
      };

    case 'REMOVE_DETAIL_ROW':     // remove row from detail table/form
      return {
        ...state,
        detail: state.detail.filter((_, i) => i !== action.payload),
      };

    case 'CALCULATE_AMOUNT':        // calculate total amount of the detail table
      const total = state.detail.reduce((sum, row) => {
        const qty = parseFloat(row.qty) || 0;
        const rate = parseFloat(row.rate) || 0;
        return sum + qty * rate;
      }, 0);
      return {
        ...state,
        header: {
          ...state.header,
          ac_amt: total,
        },
      };
    case 'RESET_HEADER':
      return {
        ...state,
        header: initialState.header,
      };

    case 'RESET_DETAIL':
      return {
        ...state,
        detail: [],
      };


    case 'RESET_FORM':        // reset/clear form
      return initialState;

    default:
      return state;
  }
};

export default salesReducer;
