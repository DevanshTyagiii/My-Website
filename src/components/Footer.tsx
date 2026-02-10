const Footer = () => {
  return (
    <footer id="contact" className="py-12 px-6 md:px-12 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-lg font-semibold tracking-tight">DEVANSH DIGITAL STUDIO</p>
            <p className="text-muted-foreground text-sm mt-1">
              Premium Websites That Turn Visitors Into Customers
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">devansh.studio.work@gmail.com</p>
            <p className="text-sm text-muted-foreground mt-1">© 2026 Devansh Digital Studio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
