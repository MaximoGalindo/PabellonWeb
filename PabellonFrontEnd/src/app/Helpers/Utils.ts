export class Utils {
  static formatDate(date: Date, format: string): string {
    const map: Record<string, string> = {
      dd: String(date.getDate()).padStart(2, '0'),
      MM: String(date.getMonth() + 1).padStart(2, '0'), // Los meses empiezan desde 0
      yyyy: date.getFullYear().toString(),
      HH: String(date.getHours()).padStart(2, '0'),
      mm: String(date.getMinutes()).padStart(2, '0'),
      ss: String(date.getSeconds()).padStart(2, '0'),
    };

    return format.replace(/dd|MM|yyyy|HH|mm|ss/g, (matched) => map[matched]);
  }

  static formatNumberWithCommas(number: number): string {
    return `$${number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
}