import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Card, PageHeader } from '../../../shared/ui';

interface WorkspacePageProps {
  eyebrow: string;
  title: string;
  summary: string;
  highlights: string[];
}

/**
 * Generic placeholder used by routes that haven't been implemented yet.
 * Built entirely from shared UI primitives as a smoke test for the
 * design system — replace this with a real page module when shipping.
 */
export function WorkspacePage({ eyebrow, title, summary, highlights }: WorkspacePageProps) {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        summary={summary}
        action={
          <Link to="/">
            <Button variant="primary" icon={ArrowRight} iconPosition="right">
              Back to Overview
            </Button>
          </Link>
        }
      />

      <section className="grid gap-6 xl:grid-cols-3">
        {highlights.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + index * 0.08, duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Card>
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Implementation Focus {index + 1}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
