export const appointmentsStatuses = (status) => {
    switch (status) {
        case "1":
            return { message: 'Waiting for approval', color: '#fbcb78' };
        case "2":
            return { message: 'Approved', color: '#73c175' };
        case "3":
            return { message: 'Declined', color: '#e97a77' };
        case "4":
            return { message: 'Canceled', color: '#e97a77' };
        default:
            break;
    }
}