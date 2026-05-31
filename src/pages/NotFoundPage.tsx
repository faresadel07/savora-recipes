import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="container-narrow py-28 text-center">
      <p className="eyebrow mb-5">{t('notFound.eyebrow')}</p>
      <h1 className="text-display-xl">
        {t('notFound.title1')}
        <span className="text-terracotta-500"> {t('notFound.title2')}</span>
      </h1>
      <p className="mx-auto mt-7 max-w-md text-base tracking-tight text-ink-600 sm:text-lg">
        {t('notFound.body')}
      </p>
      <Link to="/" className="btn-primary mt-9">
        {t('common.backToHome')}
      </Link>
    </div>
  );
}
