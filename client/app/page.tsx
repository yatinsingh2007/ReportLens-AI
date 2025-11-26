import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesGrid } from "@/components/features-grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-background">
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesGrid />

        {/* CTA Section */}
        <section className="relative w-full py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="bg-white/3 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/10 rounded-2xl p-8 md:p-12 lg:p-16">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                  Start your journey to better health insights today.
                </p>
                <Button
                  size="lg"
                  asChild
                  className="group bg-linear-to-r from-emerald-500 to-cyan-500 px-8 text-base hover:from-emerald-600 hover:to-cyan-600"
                >
                  <Link href="/signup">
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2025 ReportLens AI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

