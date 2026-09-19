import { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, ChefHat, Clock3, Flame, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import soyaAsset from "@/assets/soya-chunks.png.asset.json";
import pastaAsset from "@/assets/pasta-vermicelli.png.asset.json";
import spiceAsset from "@/assets/whole-spices.png.asset.json";
import mixedPickleAsset from "@/assets/mixed-pickle.png.asset.json";
import sweetBerryAsset from "@/assets/sweet-berry-pickle.png.asset.json";

const assetUrl = (path: string) => `https://sudevi-agro-web.lovable.app${path}`;

type Recipe = {
  id: string;
  title: string;
  category: string;
  time: string;
  servings: string;
  level: string;
  image: string;
  imageAlt: string;
  introduction: string;
  ingredients: string[];
  steps: string[];
};

const recipes: Recipe[] = [
  {
    id: "soya-chunk-pulao",
    title: "Soya Chunk Pulao",
    category: "Soya Chunks",
    time: "35 min",
    servings: "4 servings",
    level: "Easy",
    image: assetUrl(soyaAsset.url),
    imageAlt: "Sudevi Soya Chunks packet",
    introduction: "A wholesome one-pot pulao with tender soya chunks, fragrant rice and colourful vegetables.",
    ingredients: ["1 cup basmati rice", "1 cup Sudevi Soya Chunks", "1 onion, sliced", "1 cup mixed vegetables", "1 tsp ginger-garlic paste", "2 cups water", "Whole spices, salt and oil"],
    steps: ["Soak the rice for 20 minutes. Boil the soya chunks for 5 minutes, drain and gently squeeze.", "Heat oil and sauté the whole spices, onion and ginger-garlic paste until aromatic.", "Add vegetables and soya chunks, then cook for 3 minutes with salt and your preferred masala.", "Add drained rice and water. Cover and cook on low heat until the rice is fluffy.", "Rest for 5 minutes, fluff with a fork and serve hot."],
  },
  {
    id: "masala-vermicelli-upma",
    title: "Masala Vermicelli Upma",
    category: "Vermicelli",
    time: "25 min",
    servings: "3 servings",
    level: "Easy",
    image: assetUrl(pastaAsset.url),
    imageAlt: "Sudevi Pasta Vermicelli packet",
    introduction: "A quick, savoury breakfast made with roasted vermicelli, crisp vegetables and gentle spices.",
    ingredients: ["2 cups Sudevi Vermicelli", "1 onion, finely chopped", "1 tomato, chopped", "1 cup mixed vegetables", "1 tsp mustard seeds", "8 curry leaves", "3 cups hot water", "Salt, lemon and oil"],
    steps: ["Dry-roast the vermicelli until lightly golden and keep aside.", "Heat oil; crackle mustard seeds, then add curry leaves and onion.", "Add tomato and vegetables. Cook until slightly tender.", "Pour in hot water and salt. Once boiling, add the roasted vermicelli.", "Cook uncovered until the water is absorbed. Finish with lemon juice."],
  },
  {
    id: "indian-masala-pasta",
    title: "Indian Masala Pasta",
    category: "Pasta",
    time: "30 min",
    servings: "3 servings",
    level: "Easy",
    image: assetUrl(pastaAsset.url),
    imageAlt: "Sudevi Pasta Vermicelli packet",
    introduction: "Comforting pasta tossed in a bright, lightly spiced tomato masala for an Indian-style family meal.",
    ingredients: ["250 g Sudevi Pasta", "2 tomatoes, puréed", "1 onion, chopped", "1 capsicum, diced", "1 tsp ginger-garlic paste", "½ tsp chilli powder", "½ tsp garam masala", "Salt, oil and coriander"],
    steps: ["Boil the pasta in salted water until just tender. Drain and reserve a little cooking water.", "Sauté onion and ginger-garlic paste in oil. Add capsicum and cook for 2 minutes.", "Stir in tomato purée, chilli powder, garam masala and salt; cook until glossy.", "Add the pasta and a splash of reserved water. Toss well for 2 minutes.", "Garnish with coriander and serve immediately."],
  },
  {
    id: "whole-spice-jeera-rice",
    title: "Whole-Spice Jeera Rice",
    category: "Spices",
    time: "25 min",
    servings: "4 servings",
    level: "Easy",
    image: assetUrl(spiceAsset.url),
    imageAlt: "Sudevi Whole Spices packet",
    introduction: "Fluffy basmati rice perfumed with cumin and whole spices—a versatile partner for dal or curry.",
    ingredients: ["1½ cups basmati rice", "2 tsp Sudevi cumin seeds", "1 bay leaf", "1 cinnamon stick", "3 cloves", "2 green cardamoms", "3 cups water", "Ghee and salt"],
    steps: ["Rinse and soak the rice for 20 minutes, then drain.", "Warm ghee in a pot and gently toast cumin and the whole spices until fragrant.", "Add rice and stir carefully for one minute to coat each grain.", "Add water and salt. Cover and cook on low heat until the water is absorbed.", "Rest covered for 5 minutes, then fluff and serve."],
  },
  {
    id: "mixed-pickle-paratha",
    title: "Mixed Pickle Paratha",
    category: "Pickles",
    time: "30 min",
    servings: "4 parathas",
    level: "Easy",
    image: assetUrl(mixedPickleAsset.url),
    imageAlt: "Sudevi Mix Pickle jar",
    introduction: "Tangy, spicy parathas with Sudevi Mix Pickle folded through a simple potato filling.",
    ingredients: ["2 cups whole-wheat flour", "2 boiled potatoes", "2 tbsp Sudevi Mix Pickle, finely chopped", "½ tsp roasted cumin powder", "Fresh coriander", "Salt, water and ghee"],
    steps: ["Knead flour, salt and water into a soft dough. Cover and rest for 15 minutes.", "Mash potatoes with chopped pickle, cumin and coriander.", "Stuff a dough ball with the filling, seal and roll gently into a paratha.", "Cook on a hot tawa, applying a little ghee on both sides until golden.", "Serve hot with curd or extra pickle."],
  },
  {
    id: "sweet-berry-pickle-rice",
    title: "Sweet Berry Pickle Rice",
    category: "Pickles",
    time: "15 min",
    servings: "2 servings",
    level: "Quick",
    image: assetUrl(sweetBerryAsset.url),
    imageAlt: "Sudevi Sweet Berry pickle jar",
    introduction: "A clever sweet-and-tangy rice bowl that turns leftover rice into a lively, quick lunch.",
    ingredients: ["2 cups cooked rice", "2 tbsp Sudevi Sweet Berry Pickle", "2 tbsp roasted peanuts", "1 tsp mustard seeds", "6 curry leaves", "1 green chilli, sliced", "Salt and oil"],
    steps: ["Separate the cooked rice grains and keep them ready.", "Heat oil; crackle mustard seeds, then add curry leaves, chilli and peanuts.", "Lower the heat and stir in the sweet berry pickle for 30 seconds.", "Add rice and a pinch of salt. Fold gently until evenly coated.", "Cook for 2 minutes and serve warm."],
  },
];

const categories = ["All", "Soya Chunks", "Vermicelli", "Pasta", "Spices", "Pickles"];

const Recipes = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const visibleRecipes = useMemo(
    () => activeCategory === "All" ? recipes : recipes.filter((recipe) => recipe.category === activeCategory),
    [activeCategory],
  );

  return (
    <>
      <Helmet>
        <title>Easy Indian Recipes with Soya, Vermicelli, Pasta & Spices | Sudevi Foods</title>
        <meta name="description" content="Cook easy Indian recipes using Sudevi soya chunks, vermicelli, pasta, whole spices and pickles. Find ingredients, preparation times and simple steps." />
        <link rel="canonical" href="https://sudevifoods.com/recipes" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sudevi Kitchen Recipes" />
        <meta property="og:description" content="Everyday recipes made simple with Sudevi foods." />
        <meta property="og:url" content="https://sudevifoods.com/recipes" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section className="overflow-hidden border-b bg-secondary">
        <div className="container grid min-h-[460px] items-center gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold uppercase text-primary">
              <ChefHat className="h-5 w-5" /> Sudevi Kitchen
            </div>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">Everyday recipes.<br />Unforgettable flavour.</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">Bring the taste of tradition to your table with simple, satisfying dishes made from Sudevi favourites.</p>
            <Button size="lg" className="mt-7" onClick={() => document.getElementById("recipe-collection")?.scrollIntoView({ behavior: "smooth" })}>
              Explore recipes <ArrowRight />
            </Button>
          </div>
          <div className="relative mx-auto flex h-[300px] w-full max-w-[520px] items-end justify-center md:h-[360px]">
            <div className="absolute bottom-3 h-20 w-4/5 rounded-[50%] bg-foreground/10 blur-xl" />
            <img src={assetUrl(soyaAsset.url)} alt="Sudevi Soya Chunks" className="relative z-10 h-full w-auto object-contain drop-shadow-2xl" />
            <img src={assetUrl(mixedPickleAsset.url)} alt="Sudevi Mix Pickle" className="absolute bottom-0 right-0 z-20 h-[62%] w-auto object-contain drop-shadow-xl" />
          </div>
        </div>
      </section>

      <section id="recipe-collection" className="py-16 md:py-20">
        <div className="container">
          <div className="mb-9 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase text-primary">Cook with Sudevi</p>
            <h2 className="text-3xl font-bold md:text-4xl">Find your next favourite</h2>
            <p className="mt-3 text-muted-foreground">Choose a category, then open any recipe for its full ingredient list and method.</p>
          </div>

          <div className="mb-10 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter recipes by category">
            {categories.map((category) => (
              <Button key={category} variant={activeCategory === category ? "default" : "outline"} className="shrink-0" onClick={() => setActiveCategory(category)}>
                {category}
              </Button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleRecipes.map((recipe) => (
              <article key={recipe.id} className="group flex min-h-[470px] flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-64 overflow-hidden bg-secondary p-5">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-background px-3 py-1 text-xs font-semibold shadow-sm">{recipe.category}</span>
                  <img src={recipe.image} alt={recipe.imageAlt} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap gap-4 text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Clock3 className="h-4 w-4 text-primary" />{recipe.time}</span>
                    <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" />{recipe.servings}</span>
                    <span className="flex items-center gap-1.5"><Flame className="h-4 w-4 text-primary" />{recipe.level}</span>
                  </div>
                  <h3 className="text-xl font-bold">{recipe.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{recipe.introduction}</p>
                  <Button variant="link" className="mt-4 h-auto justify-start p-0" onClick={() => setSelectedRecipe(recipe)}>
                    View recipe <ArrowRight />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-secondary py-14">
        <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Start with quality</p>
            <h2 className="mt-2 text-3xl font-bold">Stock your kitchen with Sudevi</h2>
            <p className="mt-2 text-muted-foreground">Explore authentic ingredients made for everyday Indian cooking.</p>
          </div>
          <Button asChild size="lg"><a href="/products">Shop our products <ArrowRight /></a></Button>
        </div>
      </section>

      <Dialog open={selectedRecipe !== null} onOpenChange={(open) => { if (!open) setSelectedRecipe(null); }}>
        {selectedRecipe && (
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto p-0">
            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
              <div className="flex min-h-72 items-center justify-center bg-secondary p-8">
                <img src={selectedRecipe.image} alt={selectedRecipe.imageAlt} className="max-h-80 w-full object-contain" />
              </div>
              <div className="p-6 md:p-8">
                <DialogHeader>
                  <p className="text-sm font-semibold uppercase text-primary">{selectedRecipe.category}</p>
                  <DialogTitle className="text-2xl md:text-3xl">{selectedRecipe.title}</DialogTitle>
                  <DialogDescription className="leading-6">{selectedRecipe.introduction}</DialogDescription>
                </DialogHeader>
                <div className="my-5 flex flex-wrap gap-4 border-y py-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2"><Clock3 className="text-primary" />{selectedRecipe.time}</span>
                  <span className="flex items-center gap-2"><Users className="text-primary" />{selectedRecipe.servings}</span>
                  <span className="flex items-center gap-2"><Flame className="text-primary" />{selectedRecipe.level}</span>
                </div>
                <h3 className="mb-3 text-lg font-bold">Ingredients</h3>
                <ul className="mb-7 grid gap-x-6 gap-y-2 text-sm text-muted-foreground sm:grid-cols-2">
                  {selectedRecipe.ingredients.map((ingredient) => <li key={ingredient} className="flex gap-2"><span className="text-primary">•</span>{ingredient}</li>)}
                </ul>
                <h3 className="mb-4 text-lg font-bold">Method</h3>
                <ol className="space-y-4">
                  {selectedRecipe.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default Recipes;