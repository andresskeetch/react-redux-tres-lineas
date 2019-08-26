export const type = 'selectOption'

const selectOption = (indexRow, indexColumn, playerActive) => {
    return {
        type,
        payload: {
            indexRow, indexColumn, playerActive
        }
    };
}

export default selectOption;