import WizardModal from "@/components/WizardModal";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <WizardModal />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">Welcome to Rock Academy</h1>
        <p className="text-xl text-muted-foreground">
          Discover if Rock Academy is the right fit for your family.
        </p>
      </div>
    </div>
  );
};

export default Index;
