const Loading = () => (
  <div className="min-h-screen flex items-center justify-center pt-20">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-peach/30 border-t-peach rounded-full animate-spin" />
      <p className="font-sans text-charcoal/60 text-sm">Chargement...</p>
    </div>
  </div>
);

export default Loading;
