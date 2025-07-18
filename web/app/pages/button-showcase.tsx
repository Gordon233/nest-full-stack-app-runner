import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export default function ButtonShowcase() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-700 hover:underline dark:text-blue-500"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Button Component Showcase</h1>
        <p className="text-muted-foreground">
          Explore all variants and sizes of the Button component
        </p>
      </div>

      {/* Button Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Button Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🚀</Button>
        </div>
      </section>

      {/* Variant + Size Combinations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Size Variations by Variant</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Default Variant</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="default" size="sm">Small</Button>
              <Button variant="default" size="default">Default</Button>
              <Button variant="default" size="lg">Large</Button>
              <Button variant="default" size="icon">🎯</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Destructive Variant</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="destructive" size="sm">Small</Button>
              <Button variant="destructive" size="default">Default</Button>
              <Button variant="destructive" size="lg">Large</Button>
              <Button variant="destructive" size="icon">⚠️</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Outline Variant</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm">Small</Button>
              <Button variant="outline" size="default">Default</Button>
              <Button variant="outline" size="lg">Large</Button>
              <Button variant="outline" size="icon">📝</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Secondary Variant</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="secondary" size="sm">Small</Button>
              <Button variant="secondary" size="default">Default</Button>
              <Button variant="secondary" size="lg">Large</Button>
              <Button variant="secondary" size="icon">⚙️</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Ghost Variant</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="ghost" size="sm">Small</Button>
              <Button variant="ghost" size="default">Default</Button>
              <Button variant="ghost" size="lg">Large</Button>
              <Button variant="ghost" size="icon">👻</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Link Variant</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="link" size="sm">Small Link</Button>
              <Button variant="link" size="default">Default Link</Button>
              <Button variant="link" size="lg">Large Link</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Interactive States</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Disabled State</h3>
            <div className="flex flex-wrap gap-2">
              <Button disabled>Default Disabled</Button>
              <Button variant="destructive" disabled>Destructive Disabled</Button>
              <Button variant="outline" disabled>Outline Disabled</Button>
              <Button variant="secondary" disabled>Secondary Disabled</Button>
            </div>
          </div>
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons with Content</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">With Emojis</h3>
            <div className="flex flex-wrap gap-2">
              <Button>🚀 Launch</Button>
              <Button variant="destructive">🗑️ Delete</Button>
              <Button variant="outline">📁 Open</Button>
              <Button variant="secondary">⚙️ Settings</Button>
              <Button variant="ghost">👁️ View</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Usage Examples</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button>Save Changes</Button>
            <Button variant="outline">Cancel</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="destructive">Delete Account</Button>
            <Button variant="ghost">Maybe Later</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="lg">Get Started</Button>
            <Button variant="link" size="lg">Learn More</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
