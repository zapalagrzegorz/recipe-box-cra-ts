import * as React from 'react';

import Recipe from './Recipe';
import { Dialog } from './Dialog';

import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

export interface IRecipeObj {
    readonly name: string,
    readonly ingredients: string,
    readonly directions: string
}

export interface IRecipeList {
    readonly [key: string]: IRecipeObj
}

interface IListRecipesState extends IRecipeObj {
    readonly dialogType: string,
    readonly recipesListElements: JSX.Element[],
    readonly recipesList: IRecipeList,
    readonly recipeKey: string,
    readonly isModalOpen: boolean
}

export default class ListRecipes extends React.Component<{}, IListRecipesState> {
    readonly state: IListRecipesState = {
        dialogType: '',
        name: '',
        ingredients: '',
        directions: '',
        recipesListElements: [],
        recipesList: {},
        recipeKey: '',
        isModalOpen: false,
    }

    componentDidMount() {
        if (!localStorage.getItem('recipesList')) {
            this.populateStorage();
        }
        this.updateRecipesList();
    }

    updateRecipesList = () => {
        let recipesListElements: JSX.Element[] = [];

        const recipesList: IRecipeList = JSON.parse(localStorage.getItem('recipesList')!);

        for (const recipeKey in recipesList) {
            const recipe = recipesList[recipeKey];

            recipesListElements.push(<Recipe
                key={recipe.name}
                title={recipe.name}
                ingredients={recipe.ingredients}
                directions={recipe.directions}
                onButtonEditClick={() => this.handleDialog('edit', recipe, recipeKey)}
                onButtonDeleteClick={() => this.handleDialog('delete', recipe, recipeKey)}
            />);
        }

        this.setState({recipesListElements, recipesList});
    }

    /**
     * Wypełnienie local storage przepisami
     * zapisywanie obiektu w LocalStorage jest symulowane przez JSON.stringify 
     */
    populateStorage(): void {
        const recipesList = {
            Bigos: {
                name: "Bigos",
                ingredients: "Kapusta, kiełbasa, przyprawy",
                directions: `Kapustę przepłukać pod bieżącą wodą jeśli jest bardzo kwaśna. Odcisnąć z nadmiaru soku, a następnie poszatkować. Włożyć do dużego garnka i zalać wrzątkiem, dodać śliwki, liście laurowe i ziele angielskie. Dusić, aż zmięknie (ok. 50 minut).\n\nW międzyczasie zalać suszone grzyby wrzątkiem w małym garnuszku.Odstawić.\n\nCebulę podsmażyć aby się zeszkliła.Do podsmażonej cebuli dodać kiełbasę i zesmażyć na rumiano.\n\nW oddzielnym garnku zagotować ok.litr wody.Do wrzątku dodać wołowinę, cielęcinę(lub łopatkę) i boczek.Gotować około 20 minut, a następnie mięso odcedzić.\n\nGdy kapusta będzie już miękka, dodać grzyby(odcedzone i pokrojone na małe kawałki), mięso oraz cebulę z kiełbasą.Gotować na małym ogniu bez przykrycia przez 20 minut.Jeśli jest za dużo wody, należy ją odlać.\n\nDodać czerwone wino i gotować jeszcze 15 minut.Doprawić majerankiem, kminkiem, solą i pieprzem.Dodać przecier pomidorowy(opcjonalnie) i podgrzać jeszcze dobrze całość, mieszając.Jeśli bigos jest zbyt suchy, podlać wodą po grzybach.\n\nJeśli chcemy, by bigos był smaczniejszy, można go jeszcze dusić na małym ogniu pod przykryciem przez godzinę.Należy jednak pilnować, żeby nie przywarł i od czasu do czasu mieszać, a jeśli jest za suchy - podlać wodą z grzybów.`
            },
            Naleśniki: {
                name: "Naleśniki",
                ingredients: "Mąka, mleko, woda, sól, pieprz, dodatki",
                directions: `Mąkę wsypać do miski, dodać jajka, mleko, wodę i sól. Zmiksować na gładkie ciasto. Dodać roztopione masło lub olej roślinny i razem zmiksować (lub wykorzystać tłuszcz do smarowania patelni przed smażeniem każdego naleśnika).\n \nNaleśniki smażyć na dobrze rozgrzanej patelni z cienkim dnem np. naleśnikowej. Przewrócić na drugą stronę gdy spód naleśnika będzie już ładnie zrumieniony i ścięty.\n \nWSKAZÓWKI\n \nDo naleśników deserowych można dodać 1 łyżkę cukru.`
            },
            Schabowy: {
                name: "Schabowy",
                ingredients: "Mięso, ziemniaki, surówka",
                directions: `Ostrym nożem odciąć białą otoczkę z żyłki po zewnętrznej części mięsa. Pokroić na 4 plastry. Położyć na desce i dokładnie roztłuc na cieniutkie filety (mogą wyjść duże, wielkości pół talerza). Do rozbicia mięsa najlepiej użyć specjalnego tłuczka z metalowym obiciem z wytłoczoną krateczką.\n\nFilety namoczyć w mleku z dodatkiem soli i pieprzu(ewentualnie z dodatkiem kilku plastrów cebuli) przez ok. 2 godziny lub dłużej jeśli mamy czas(można też zostawić do namoczenia na noc).\n\nWyjąć filety z mleka i osuszyć je papierowymi ręcznikami.Doprawić solą(niezbyt dużo, bo zalewa z mleka była już solona) i pieprzem, obtoczyć w mące, następnie w roztrzepanym jajku, a na koniec w bułce tartej.\n\nNa patelni rozgrzać klarowane masło(ok. 1 / 2 cm warstwa) lub smalec.Smażyć partiami po 2 kotlety, na większym ogniu, po 2 minuty z każdej strony.Następnie zmniejszyć ogień i smażyć jeszcze po ok. 3 minuty z każdej strony.Przetrzeć patelnię papierowym ręcznikiem i powtórzyć z kolejną partią, na świeżym tłuszczu.\n\nUsmażone schabowe odsączyć z tłuszczu na papierowym ręczniku i podawać z ziemniakami i kapustą lub mizerią.`
            },
        }

        localStorage.setItem('recipesList', JSON.stringify(recipesList));
    }

    /**
     * Zbiera dane do wyświetlania okna dialogowego
     * Metoda przypisywana jest do przycisków komponentu Recipe 
     * Uwaga - wszystkie argumenty event handler'a trzeba przekazać już teraz
     */

    handleDialog = (
        dialogType: string,
        dialogRecipeData: IRecipeObj,
        recipeKey: string
    ): void => {
        this.setState({
            isModalOpen: true,
            dialogType,
            name: dialogRecipeData.name,
            ingredients: dialogRecipeData.ingredients,
            directions: dialogRecipeData.directions,
            recipeKey
        });
    }

    handleHideDialog = (): void => {
        this.setState({ isModalOpen: false });
    }

    render() {
        const wrapStyle = {
            marginTop: '2rem'
        };

        const emptyRecipe = {
            name: '',
            ingredients: '',
            directions: ''
        }
        return (
            <div style={wrapStyle} className="grid-container">
                <CssBaseline />

                <div className="grid-x">
                    <div className="cell small-12">
                        <Card>
                            <CardContent>
                                <Typography
                                    variant="display1"
                                    align="center"
                                    gutterBottom={true}
                                >Recipe box</Typography>
                                <div className="recipesListElementsWrap">
                                    {this.state.recipesListElements}
                                </div>
                            </CardContent>
                            <CardActions
                                style={{ padding: '20px' }}
                            >
                                <Button
                                    id="addRecipeButton"
                                    variant="contained"
                                    color="primary"
                                    className="button"
                                    type="button"
                                    onClick={() => this.handleDialog('add', emptyRecipe, '')}
                                >
                                    Add recipe
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>
                <Dialog
                    dialogType={this.state.dialogType}
                    currentName={this.state.name}
                    currentDirections={this.state.directions}
                    currentIngredients={this.state.ingredients}
                    recipesList={this.state.recipesList}
                    recipeKey={this.state.recipeKey}
                    isModalOpen={this.state.isModalOpen}
                    updateRecipesList={this.updateRecipesList}
                    hideDialog={this.handleHideDialog}
                />
            </div>
        );
    }
}