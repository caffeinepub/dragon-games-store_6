export function AboutSection() {
  return (
    <section className="bg-blue-600 border-y border-blue-700 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-white">Dragon Games Store</h2>
          <p className="text-lg text-white leading-relaxed">
            Your trusted gaming partner for 3 years. Over <span className="font-bold text-white">10,000 game orders</span> delivered to{" "}
            <span className="font-bold text-white">5,600+ satisfied customers</span>. Highly rated on Instagram, WhatsApp, and Facebook.
          </p>
          <div className="flex justify-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">3+</div>
              <div className="text-sm text-white/90">Years</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-sm text-white/90">Orders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">5.6K+</div>
              <div className="text-sm text-white/90">Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
