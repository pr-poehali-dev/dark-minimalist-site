import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type CountryStatus = 'active' | 'blocked' | 'upcoming' | 'unavailable';

interface Country {
  id: string;
  name: string;
  zone: 'НЗВ' | 'ОСЬ' | 'ОСИ';
  status: CountryStatus;
  availableFrom?: string;
}

const countries: Country[] = [
  { id: '1', name: 'Недралическая Империя', zone: 'ОСЬ', status: 'active' },
  { id: '2', name: 'Блэрний', zone: 'НЗВ', status: 'active' },
  { id: '3', name: 'Герцеговинск', zone: 'НЗВ', status: 'active' },
  { id: '4', name: 'Галактическая Империя', zone: 'ОСЬ', status: 'active' },
  { id: '5', name: 'Кхмерэн', zone: 'ОСЬ', status: 'upcoming', availableFrom: '1 января 2026' },
  { id: '6', name: 'Абзерстан', zone: 'ОСЬ', status: 'blocked' },
  { id: '7', name: 'Свободная Республика Тартасия', zone: 'ОСЬ', status: 'unavailable' },
  { id: '8', name: 'Ягловинск', zone: 'ОСЬ', status: 'unavailable' },
  { id: '9', name: 'Йораджистан', zone: 'ОСЬ', status: 'unavailable' },
  { id: '10', name: 'Царан', zone: 'ОСЬ', status: 'unavailable' },
  { id: '11', name: 'Рожская Республика', zone: 'ОСЬ', status: 'unavailable' },
  { id: '12', name: 'Щранская Республика', zone: 'ОСЬ', status: 'unavailable' },
  { id: '13', name: 'Зурская Республика', zone: 'ОСЬ', status: 'unavailable' },
  { id: '14', name: 'Беблэр', zone: 'ОСЬ', status: 'unavailable' },
  { id: '15', name: 'Граценвинск', zone: 'ОСЬ', status: 'unavailable' },
  { id: '16', name: 'Сламодия', zone: 'ОСЬ', status: 'unavailable' },
  { id: '17', name: 'Другие страны ОСИ', zone: 'ОСИ', status: 'unavailable' },
];

const Index = () => {
  const [selectedZone, setSelectedZone] = useState<string>('ОСЬ');
  const [selectedCountry, setSelectedCountry] = useState<string>('1');

  const filteredCountries = useMemo(() => {
    let filtered = countries;

    if (selectedZone !== 'all') {
      filtered = filtered.filter((c) => c.zone === selectedZone);
    }

    return filtered;
  }, [selectedZone]);

  const selectedCountryData = countries.find((c) => c.id === selectedCountry);

  const handleConfirm = () => {
    if (selectedCountryData?.status === 'blocked') {
      toast.error('Эта страна заблокирована на территории Империи');
      return;
    }
    if (selectedCountryData?.status === 'upcoming') {
      toast.warning(`Эта страна будет доступна с ${selectedCountryData.availableFrom}`);
      return;
    }
    if (selectedCountryData?.status === 'unavailable') {
      toast.warning('Эта страна пока недоступна');
      return;
    }
    toast.success(`Страна "${selectedCountryData?.name}" успешно выбрана!`);
  };

  const getStatusBadge = (country: Country) => {
    if (country.status === 'blocked') {
      return (
        <Badge variant="destructive" className="ml-2 text-xs">
          Заблокирована
        </Badge>
      );
    }
    if (country.status === 'upcoming') {
      return (
        <Badge variant="secondary" className="ml-2 text-xs bg-muted text-muted-foreground">
          С {country.availableFrom}
        </Badge>
      );
    }
    if (country.status === 'unavailable') {
      return (
        <Badge variant="secondary" className="ml-2 text-xs bg-muted text-muted-foreground">
          Недоступно
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#1a0b2e] via-[#16213e] to-[#0f0e23]">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#7b2cbf] via-[#9d4edd] to-[#e91e63] bg-clip-text text-transparent">
            DEEPTUBE
          </h1>
          <p className="text-lg text-muted-foreground">Выберите страну вашего аккаунта</p>
        </div>

        <div className="space-y-8 bg-card/30 backdrop-blur-md p-8 rounded-2xl border border-border/50 shadow-2xl animate-scale-in">
          <div className="space-y-4">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Icon name="Flag" size={20} className="text-primary" />
              ВЫБОР ЗОНЫ
            </Label>
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger className="w-full h-14 text-base bg-background/50 border-border/50 hover:border-primary/50 transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ВСЕ СТРАНЫ</SelectItem>
                <SelectItem value="ОСЬ">ОСЬ</SelectItem>
                <SelectItem value="НЗВ">НЗВ</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="Info" size={14} />
              {selectedZone === 'all'
                ? 'Показать все доступные страны'
                : selectedZone === 'ОСЬ'
                ? 'Мы работаем над тем чтобы любая страна из ОСИ смогла пользоваться нашим сайтом'
                : 'Герцеговинск, Блэрний'}
            </p>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Icon name="Globe" size={20} className="text-secondary" />
              ВЫБОР СТРАНЫ
            </Label>

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full h-14 text-base bg-background/50 border-border/50 hover:border-primary/50 transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {filteredCountries.map((country) => (
                  <SelectItem
                    key={country.id}
                    value={country.id}
                    disabled={country.status !== 'active'}
                    className="py-3"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{country.name}</span>
                      {getStatusBadge(country)}
                    </div>
                  </SelectItem>
                ))}

              </SelectContent>
            </Select>

            {selectedCountryData && (
              <div className="p-4 rounded-lg bg-muted/30 border border-border/30 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7b2cbf] to-[#e91e63] flex items-center justify-center">
                    <Icon name="MapPin" size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{selectedCountryData.name}</p>
                    <p className="text-sm text-muted-foreground">Зона: {selectedCountryData.zone}</p>
                  </div>
                  {getStatusBadge(selectedCountryData)}
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={handleConfirm}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[#4a1a5e] via-[#7b2cbf] to-[#c44569] hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Подтвердить выбор
          </Button>

          <div className="space-y-2">
            <p className="text-center text-sm text-muted-foreground/80 flex items-center justify-center gap-2">
              <Icon name="AlertCircle" size={14} />
              Страну можно менять не чаще 1 раза в месяц
            </p>
            {selectedZone === 'ОСЬ' && (
              <p className="text-center text-sm text-muted-foreground/70 flex items-center justify-center gap-2">
                <Icon name="Clock" size={14} />
                Другие страны ОСИ на подходе!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;