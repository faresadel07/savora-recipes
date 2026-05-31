import { AlertTriangle, RefreshCw, Wifi } from 'lucide-react';
import { RecipeApiError } from '../api';
import { useTranslation } from '../i18n';

interface Props {
  error: unknown;
  onRetry?: () => void;
}

export default function ErrorState({ error, onRetry }: Props) {
  const { t } = useTranslation();
  const e = error as RecipeApiError | Error;
  const kind = (e as RecipeApiError).kind;

  let title = t('error.title');
  let body = t('error.body');
  let icon = <AlertTriangle className="h-7 w-7" strokeWidth={1.5} />;

  if (kind === 'network') {
    title = t('error.networkTitle');
    body = t('error.networkBody');
    icon = <Wifi className="h-7 w-7" strokeWidth={1.5} />;
  } else if (kind === 'not-found') {
    title = t('error.notFoundTitle');
    body = t('error.notFoundBody');
  }

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-terracotta-50 text-terracotta-600">
        {icon}
      </div>
      <h2 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2.5 text-sm tracking-tight text-ink-400">{body}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-outline mt-7">
          <RefreshCw className="h-3.5 w-3.5" />
          {t('common.tryAgain')}
        </button>
      )}
    </div>
  );
}
