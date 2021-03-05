export function convertToShortDate(stringDate: string): string {

    const date = new Date(stringDate);

    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    let day = dd.toString();

    if (dd < 10) {
        day = `0${dd};`
    }

    let month = mm.toString();

    if (mm < 10) {
        month = `0${mm}`;
    }

    return `${day}/${month}/${yyyy}`;
}