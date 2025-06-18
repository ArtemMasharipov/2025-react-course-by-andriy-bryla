import Input from '../../shared/components/Input.jsx';
import LoadingButton from '../../shared/components/LoadingButton.jsx';
import TaskDescription from '../../shared/components/TaskDescription.jsx';
import TaskLayout from '../../shared/components/layouts/TaskLayout.jsx';
import { THEME } from '../../shared/constants/index.js';

import { FORM_FIELDS, getErrorStyles } from './constants.js';
import { useLogin } from './useLogin.js';

const TaskLogin = () => {
  const {
    formData,
    error,
    success,
    isLoading,
    errorMessageType,
    handleInputChange,
    handleSubmit,
    resetForm,
  } = useLogin();

  const handleResetClick = () => resetForm();

  return (
    <TaskLayout>
      <TaskDescription taskId={1} />

      <div className={THEME.card}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="login"
            name={FORM_FIELDS.LOGIN}
            type="text"
            label="Логін"
            placeholder="Введіть логін"
            value={formData[FORM_FIELDS.LOGIN]}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            className="w-full"
            autoComplete="username"
          />

          <Input
            id="password"
            name={FORM_FIELDS.PASSWORD}
            type="password"
            label="Пароль"
            placeholder="Введіть пароль"
            value={formData[FORM_FIELDS.PASSWORD]}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            className="w-full"
            autoComplete="current-password"
          />

          {error && (
            <div className={getErrorStyles(errorMessageType).containerClass}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-xl">{getErrorStyles(errorMessageType).icon}</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="p-4 rounded-lg border-l-4 bg-green-50 border-green-400 text-green-700">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-xl">✅</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{success}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <LoadingButton
              type="submit"
              variant="primary"
              isLoading={isLoading}
              loadingText="Перевірка..."
              className="flex-1"
            >
              Увійти
            </LoadingButton>

            <LoadingButton
              type="button"
              variant="outline"
              onClick={handleResetClick}
              isLoading={isLoading}
            >
              Скинути
            </LoadingButton>
          </div>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Тестові дані:</h3>
          <div className="text-xs text-gray-600 space-y-1">
            <p>• admin / admin123</p>
            <p>• user / user123</p>
            <p>• test / test123</p>
            <p>• Іван / ivan123 (синя помилка)</p>
          </div>
        </div>
        </div>
    </TaskLayout>
  );
};

export default TaskLogin;
