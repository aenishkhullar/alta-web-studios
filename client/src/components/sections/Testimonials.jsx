import React from 'react';

export const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px'}}>
            <h2 style={{fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 700, textAlign: 'center', color: '#1a1d11', margin: '0 0 64px 0'}}>
                Clients trust us and our exclusive service
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

                {/* Testimonial 1 */}
                <div className="hover-card" style={{background: '#fafbe7', borderRadius: '24px', padding: '36px', border: '1px solid rgba(197,201,174,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div>
                        <span className="material-symbols-outlined" style={{fontSize: '40px', color: '#c8f135', display: 'block', marginBottom: '20px', fontVariationSettings: "'FILL' 1"}}>format_quote</span>
                        <p style={{fontSize: '15px', lineHeight: 1.8, color: '#5f5e5e', margin: '0 0 28px 0'}}>
                            "Alta Web Studios expertly built our astrology app with an integrated AI chatbot, providing the robust architecture needed to scale our platform to 10,000 active users. Their technical prowess was instrumental in our growth."
                        </p>
                    </div>
                    <div>
                        <p style={{fontWeight: 700, fontSize: '15px', color: '#1a1d11', margin: 0}}>Amit Kilhot</p>
                        <p style={{fontSize: '13px', color: '#5f5e5e', margin: '4px 0 0 0'}}>Founder | AstroMistral</p>
                    </div>
                </div>

                {/* Testimonial 2 */}
                <div className="hover-card" style={{background: '#fafbe7', borderRadius: '24px', padding: '36px', border: '1px solid rgba(197,201,174,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div>
                        <span className="material-symbols-outlined" style={{fontSize: '40px', color: '#c8f135', display: 'block', marginBottom: '20px', fontVariationSettings: "'FILL' 1"}}>format_quote</span>
                        <p style={{fontSize: '15px', lineHeight: 1.8, color: '#5f5e5e', margin: '0 0 28px 0'}}>
                            "Working with Alta Web Studios to build our e-commerce site was a game-changer, enabling us to seamlessly process over 75,000 orders. They delivered a high-performance solution that significantly enhanced our operational capacity."
                        </p>
                    </div>
                    <div>
                        <p style={{fontWeight: 700, fontSize: '15px', color: '#1a1d11', margin: 0}}>Kyle Eagle</p>
                        <p style={{fontSize: '13px', color: '#5f5e5e', margin: '4px 0 0 0'}}>Founder | Dropaly</p>
                    </div>
                </div>

                {/* Testimonial 3 */}
                <div className="hover-card" style={{background: '#fafbe7', borderRadius: '24px', padding: '36px', border: '1px solid rgba(197,201,174,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div>
                        <span className="material-symbols-outlined" style={{fontSize: '40px', color: '#c8f135', display: 'block', marginBottom: '20px', fontVariationSettings: "'FILL' 1"}}>format_quote</span>
                        <p style={{fontSize: '15px', lineHeight: 1.8, color: '#5f5e5e', margin: '0 0 28px 0'}}>
                            "Alta Web Studios developed a comprehensive HR Management System that streamlined our entire workflow. We now manage our employees, payroll, and attendance with unprecedented efficiency thanks to their tailored software solution."
                        </p>
                    </div>
                    <div>
                        <p style={{fontWeight: 700, fontSize: '15px', color: '#1a1d11', margin: 0}}>Jitendra Jain</p>
                        <p style={{fontSize: '13px', color: '#5f5e5e', margin: '4px 0 0 0'}}>Founder & CEO | KocharTech</p>
                    </div>
                </div>
            </div>

        </div>
    </section>
  );
};
