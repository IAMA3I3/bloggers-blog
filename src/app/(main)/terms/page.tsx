import PageHeader from "@/components/layout/PageHeader";
import { siteUrl } from "@/utils/appStore";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions",
    description:
        "Read the terms and conditions governing the use of Bloggers Blog.",
    openGraph: {
        title: "Terms & Conditions | Bloggers Blog",
        description:
            "The rules and guidelines for using the Bloggers Blog platform.",
        url: `${siteUrl}/terms`,
    },
}

export default function TermsPage() {

    return (
        <div className=" flex-1">
            <PageHeader title="Terms & Conditions" currentPage="Terms & Conditions" />
            <div className="my-12 container px-6 mx-auto space-y-10 leading-relaxed">
                <section>
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        1. Introduction
                    </h2>
                    <p className="mt-3">
                        Welcome to Bloggers Blog. By accessing or using this platform, you
                        agree to be bound by these Terms and Conditions. If you do not agree,
                        please do not use the website.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        2. Use of the Platform
                    </h2>
                    <p className="mt-3">
                        Bloggers Blog provides a platform for reading, writing, and sharing
                        content. You agree to use the platform responsibly and not engage in
                        any activity that may harm the website, its users, or its content.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        3. User Content
                    </h2>
                    <p className="mt-3">
                        You retain ownership of the content you publish. By submitting
                        content, you grant Bloggers Blog a non-exclusive right to display
                        and distribute your content on the platform.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        4. Prohibited Activities
                    </h2>
                    <p className="mt-3">
                        You agree not to post unlawful, harmful, abusive, misleading, or
                        infringing content, or attempt to gain unauthorized access to the
                        platform or its systems.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        5. Intellectual Property
                    </h2>
                    <p className="mt-3">
                        All platform branding, design, and functionality are the property
                        of Bloggers Blog unless otherwise stated. You may not copy or reuse
                        them without permission.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        6. Disclaimer
                    </h2>
                    <p className="mt-3">
                        Bloggers Blog is provided “as is” without warranties of any kind. We
                        do not guarantee the accuracy, completeness, or reliability of any
                        content published on the platform.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        7. Limitation of Liability
                    </h2>
                    <p className="mt-3">
                        Bloggers Blog shall not be liable for any damages resulting from
                        your use of the platform, including loss of data or content.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        8. Changes to These Terms
                    </h2>
                    <p className="mt-3">
                        We may update these Terms from time to time. Continued use of the
                        platform after changes means you accept the updated Terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        9. Contact
                    </h2>
                    <p className="mt-3">
                        If you have any questions about these Terms, please contact us via
                        the Contact page.
                    </p>
                </section>
            </div>
        </div>
    )
}