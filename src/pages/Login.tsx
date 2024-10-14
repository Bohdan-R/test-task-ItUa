import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form, Spin, Flex } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import loginForm from '../stores/login-form';

const Login: React.FC = observer(() => {
  const { login, password, errorMessage, isLoading, resetLogin, resetPassword, setLogin, setPassword, signIn } =
    loginForm;
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        theme: 'dark',
      });
    }
  }, [errorMessage]);

  const handleLogin = async () => {
    const res = await signIn();
    resetLogin();
    resetPassword();

    if (!res || errorMessage) {
      return;
    }

    navigate('/employees');
  };

  return (
    <div style={{ maxWidth: '300px', width: '100%', margin: '100px auto' }}>
      {isLoading ? (
        <Flex align="center" justify="center">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </Flex>
      ) : (
        <Form>
          <Form.Item>
            <Input placeholder="Логин" value={login} onChange={e => setLogin(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Input.Password placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Item>
          <Button type="primary" onClick={handleLogin} disabled={!login || !password}>
            Войти
          </Button>
        </Form>
      )}
    </div>
  );
});

export default Login;
