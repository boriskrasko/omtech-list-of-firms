# omtech-list-of-firms
## Zadanie 1.
### Przygotuj aplikację WWW (SPA) która umożliwia dodanie nowej firmy.

Aplikacja składa się z:

- formularza dodawania firmy
- tabelki z aktywnymi firmami
- tabelki z nieaktywnymi firmami


Pola wymagane do zapisania formularza:

- nazwa(tylko litery A-z, max 20 znaków)
- kod firmy(składający się z 4 cyfr, możliwość wygenerowania kodu z pomocą buttona "Generuj")
- Profil filmy(select z 3 polami Duży, Średni, Mały)
- Checkbox "Aktywna" w którym możemy określić czy firma jest już aktywna


Pola opcjonalne:

- Miasto
- Kod pocztowy
- Ulica
- Email (jeśli został podany musi posiadać odpowiedni format)


Przy próbie zatwierdzenia danych w formularzu należy sprawdzić czy spełnia wymogi opisane w nawiasach.
Jeśli firma przechodzi walidację trafia do jednej z 2 tabel (jest to uwarunkowane polem "Aktywna").
W tabelce wyświetlane są wszystkie pola firmy.
Istnieje możliwość usunięcia poszczególnej firmy z tabeli.
Dane do wyświetlania w aplikacji są przechowywane w pamięci przeglądarki
