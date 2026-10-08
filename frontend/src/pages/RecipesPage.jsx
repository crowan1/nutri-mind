import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useEffect, useMemo, useState } from 'react';
import { showErrorToast, showSuccessToast } from '../utils/Toast';
import RecipeCard from '../components/recipes/RecipeCard';

export default function RecipesPage() {

    const { user } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL

    const [recipes, setRecipes] = useState([]);
    const [tags, setTags] = useState([]);
    const [searchedTerm, setSearchedTerm] = useState('');

    // on récupère toutes les recettes de l'utilisateur connecté
    const getUserRecipes = async () => {
        if (!user?.id) return;
        try {
            await axios.get(API_URL + 'user/' + user.id + '/recipes').then(response => {
                setRecipes(response.data.data);
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des recettes", error);
            showErrorToast("Error lors de la récupération des recettes.")
        }
    }

    useEffect(() => {
        getUserRecipes();
    }, [user?.id]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                await axios.get(API_URL + 'tags').then(response => {
                    setTags(response.data.data);
                });
            } catch (error) {
                console.log("Error lors de la récupération des tags des recettes.", error);
                showErrorToast("Error lors de la récupération des tags des recettes.");
            }
        }
        fetchTags();
    }, [API_URL]);

    // filtre les recettes sur le nom ou la description
    const filteredRecipes = useMemo(() => {
        const cleanSearch = searchedTerm.trim().toLowerCase();
        return recipes.filter((recipe) => {
            const matchesSearch = recipe.name?.toLowerCase().includes(cleanSearch);
            const matchesDescription = recipe.description?.toLowerCase().includes(cleanSearch);
            return matchesSearch || matchesDescription;
        });
    }, [recipes, searchedTerm]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Mes Recettes</h1>

            <p>Filtres des recettes.</p>
            <p>{tags.map(tag => {
                <p>{tag.name}</p>
            })}</p>
            <input type="text" value={searchedTerm} placeholder="Recherche ..." onChange={(text) => setSearchedTerm(text.target.value)} className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10a34a]/20 focus:border-[#10a34a] transition-all" />


            {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                    {filteredRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center py-10">
                    Aucune recette n'a été trouvée.
                </p>
            )}
        </div>
    );
}