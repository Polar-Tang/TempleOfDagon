const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8">
        <div>
          <h2 className="text-lg font-semibold flex items-center">
            <span className="mr-2">⚡</span> ShadcnKit
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            ShadcnKit SaaS template is a powerful and versatile software
            application that provides a comprehensive framework for building and
            delivering cloud-based solutions.
          </p>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Products</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>Project Management</li>
            <li>Multi-tenancy</li>
            <li>Scalability</li>
            <li>Customization</li>
            <li>Integration</li>
            <li>Mobile accessibility</li>
            <li>Analytics and reporting</li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Features</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>User management</li>
            <li>Workflow automation</li>
            <li>API access</li>
            <li>Data visualization</li>
            <li>Version control</li>
            <li>Upgrades</li>
            <li>Billing and invoicing</li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-3">Explore</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>Docs</li>
            <li>Pricing</li>
            <li>Integrations</li>
            <li>Blog</li>
            <li>About</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        Copyright © 2023 UI-Lib. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
