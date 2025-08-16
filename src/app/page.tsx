"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LandingPage } from "@/components/LandingPage";
import { Dashboard } from "@/components/Dashboard";
import { GameCreationWizard } from "@/components/GameCreationWizard";
import { AssetLibrary } from "@/components/AssetLibrary";
import { useRouter } from "next/navigation";

// freestyle.sh UI imports
import { PromptInput, PromptInputActions } from "@/components/ui/prompt-input";
import { FrameworkSelector } from "@/components/framework-selector";
import Image from "next/image";
import LogoSvg from "@/logo.svg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExampleButton } from "@/components/ExampleButton";
import { UserButton } from "@stackframe/stack";
import { UserApps } from "@/components/user-apps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PromptInputTextareaWithTypingAnimation } from "@/components/prompt-input";

type AppState = "landing" | "dashboard" | "wizard" | "editor" | "assets";

const queryClient = new QueryClient();

export default function Page() {
  const [currentView, setCurrentView] = useState<AppState>("landing");
  const [currentGame, setCurrentGame] = useState<any>(null);

  // freestyle.sh state
  const [prompt, setPrompt] = useState("");
  const [framework, setFramework] = useState("nextjs");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const router = useRouter();

  const navigateTo = (view: AppState) => setCurrentView(view);

  const handleStartCreating = () => navigateTo("wizard");
  const handleNewGame = () => navigateTo("wizard");
  const handleEditGame = (gameId: string) => {
    setCurrentGame({ id: gameId, title: "My Game", description: "A fun adventure game" });
    navigateTo("editor");
  };

  const handleGameCreated = async (gameData: any) => {
    setCurrentGame(gameData);
    setIsLoading(true);
    setShowLoadingOverlay(true); // Show loading overlay

    try {
      const response = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameData })
      });

      const data = await response.json();
      console.log("Claude response:", data);
      setPrompt(data.content || "");
    } catch (error) {
      console.error("Error:", error);
      setPrompt(JSON.stringify(gameData, null, 2));
    } finally {
      setIsLoading(false);
      setShowLoadingOverlay(false); // Hide loading overlay
      navigateTo("editor");
    }
  };



  const handleSaveGame = () => console.log("Game saved!");
  const handleBackToDashboard = () => navigateTo("dashboard");
  const handleBackToLanding = () => navigateTo("landing");

  const handleSubmit = async () => {
    setIsLoading(true);

    router.push(
      `/app/new?message=${encodeURIComponent(prompt)}&template=${framework}`
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Loading Overlay */}
      {showLoadingOverlay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <svg className="animate-spin h-10 w-10 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="text-lg font-semibold text-purple-700">Generating your game design...</span>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      {currentView !== "landing" && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
        >
          <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-3 max-w-none">
            <div className="flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 cursor-pointer"
                onClick={handleBackToLanding}
              >
                <Image
                  src="/logo.png"
                  alt="GameSpecter Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />

                <span className="text-xl bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  GameSpecter
                </span>
              </motion.div>

              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => navigateTo("dashboard")}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentView === "dashboard"
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigateTo("assets")}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentView === "assets"
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  Asset Library
                </button>
                <button
                  onClick={handleNewGame}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  New Game
                </button>
                
                    <UserButton />
              </nav>
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {currentView === "landing" && <LandingPage onStartCreating={handleStartCreating} />}

          {currentView === "dashboard" && (
            <div style={{ paddingTop: "4rem" }}>
              <Dashboard onNewGame={handleNewGame} onEditGame={handleEditGame} />
            </div>
          )}

          {currentView === "wizard" && (
            <div style={{ paddingTop: "4rem" }}>
              <GameCreationWizard
                onComplete={handleGameCreated}
                onBack={currentGame ? handleBackToDashboard : handleBackToLanding}
              />
            </div>
          )}

          {currentView === "editor" && currentGame && (
            <QueryClientProvider client={queryClient}>
              <main className="min-h-screen pt-20 p-4 relative">
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-lg font-bold flex-1 sm:w-80">
                    <a href="https://www.freestyle.sh">freestyle.sh</a>
                  </h1>
                  <Image className="dark:invert mx-2" src={LogoSvg} alt="Adorable Logo" width={36} height={36} />
                </div>
                <div className="w-full px-4 sm:px-0 mx-auto flex flex-col items-center">
                  <p className="text-neutral-600 text-center mb-6 text-3xl sm:text-4xl md:text-5xl font-bold">
                    Let AI Cook
                  </p>

                  <div className="w-full flex justify-center my-5">
                    <div className="w-[1000px] max-w-full relative">
                      <div className="w-[1000px] bg-accent rounded-md relative z-10 border transition-colors">
                        <PromptInput
                          leftSlot={<FrameworkSelector value={framework} onChange={setFramework} />}
                          isLoading={isLoading}
                          value={prompt}
                          onValueChange={setPrompt}
                          onSubmit={handleSubmit}
                          className="w-[1000px] relative z-10 border-none bg-transparent shadow-none flex flex-col h-full"
                        >
                          <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-[1002px] min-h-[220px] bg-transparent outline-none text-sm"
                          />
                          <PromptInputActions className = "w-[980px] ">
                            <Button
                              variant={"ghost"}
                              size="sm"
                              onClick={handleSubmit}
                              disabled={isLoading || !prompt.trim()}
                              className="h-7 text-xs"
                            >
                              <span className="hidden sm:inline">Start Creating ⏎</span>
                              <span className="sm:hidden">Create ⏎</span>
                            </Button>
                          </PromptInputActions>
                        </PromptInput>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="border-t py-8">
                  <div className="mb-6 flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-gray-800">Your collection</h2>
                  </div>
                  <UserApps />
                </div>
              </main>
            </QueryClientProvider>
          )}

          {currentView === "assets" && (
            <div style={{ paddingTop: "4rem" }}>
              <AssetLibrary onBack={handleBackToDashboard} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Floating Action Button */}
      {currentView === "dashboard" && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <div className="relative">
            <button
              onClick={handleNewGame}
              className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-2xl"
            >
              <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                +
              </motion.div>
            </button>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-ping opacity-20"></div>
          </div>
        </motion.div>
      )}

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-1/3 -right-32 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </div>
  );
}
