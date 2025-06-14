export class SettingsKey {
    public static readonly SHIPING_COST = 'shipping_cost'
    public static readonly PHONE_NUMBER = 'phone_number'
    public static readonly STORE_MONDAY = 'store_monday'
    public static readonly STORE_TUESDAY = 'store_tuesday'
    public static readonly STORE_WEDNESDAY = 'store_wednesday'
    public static readonly STORE_THURSDAY = 'store_thursday'
    public static readonly STORE_FRIDAY = 'store_friday'
    public static readonly STORE_SATURDAY = 'store_saturday'
    public static readonly STORE_SUNDAY = 'store_sunday'
}

export const SettingNames: Record<string, string> = {
  [SettingsKey.SHIPING_COST]: 'Costo de envío',
  [SettingsKey.PHONE_NUMBER]: 'Número de teléfono',
  [SettingsKey.STORE_MONDAY]: 'Horario Lunes',
  [SettingsKey.STORE_TUESDAY]: 'Horario  Martes',
  [SettingsKey.STORE_WEDNESDAY]: 'Horario Miércoles',
  [SettingsKey.STORE_THURSDAY]: 'Horario Jueves',
  [SettingsKey.STORE_FRIDAY]: 'Horario Viernes',
  [SettingsKey.STORE_SATURDAY]: 'Horario Sábado',
  [SettingsKey.STORE_SUNDAY]: 'Horario Domingo',
};
