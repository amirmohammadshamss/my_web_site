import Link from 'next/link';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="pt-page pt-page-current" data-id="not-found">
      <div className="section-inner custom-page-content">
        <div className="page-header color-1">
          <h2>Page not found</h2>
        </div>
        <div className="page-content">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="block">
                <p>That page does not exist.</p>
                <div className="download-resume">
                  <Link href="/" className="btn btn-secondary">
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
