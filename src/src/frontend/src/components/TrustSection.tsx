import { CheckCircle2, TrendingUp, Users, Award } from "lucide-react";

export function TrustSection() {
  return (
    <section className="bg-blue-600 border-y border-blue-700 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Trust Dragon Games Store?
            </h2>
            <p className="text-xl text-white/95 leading-relaxed">
              We've built our reputation on reliability, authenticity, and exceptional customer service.
            </p>
          </div>

          {/* Trust Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="flex gap-4">
              <div className="shrink-0">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">3 Years of Excellence</h3>
                <p className="text-white/90 leading-relaxed">
                  Since our launch, we've consistently delivered authentic games and unmatched customer support, making us a trusted name in the gaming community.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">10,000+ Successful Orders</h3>
                <p className="text-white/90 leading-relaxed">
                  Every game key is verified and delivered instantly. Our track record speaks for itself—thousands of gamers trust us every day.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">5,600+ Happy Customers</h3>
                <p className="text-white/90 leading-relaxed">
                  Our growing community of satisfied gamers returns time and again. Join thousands who've made Dragon Games Store their go-to source.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Highly Rated Across Platforms</h3>
                <p className="text-white/90 leading-relaxed">
                  Trusted on Instagram, WhatsApp, and Facebook with outstanding reviews. Our reputation for fast delivery and genuine products is unmatched.
                </p>
              </div>
            </div>
          </div>

          {/* Social Proof Statement */}
          <div className="bg-white/10 border border-white/20 rounded-lg p-6 text-center backdrop-blur-sm">
            <p className="text-lg text-white font-semibold mb-2">
              "Authentic games, instant delivery, unbeatable prices."
            </p>
            <p className="text-white/90">
              Dragon Games Store is your reliable partner for all gaming needs—from PC and Xbox to PlayStation and Steam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
