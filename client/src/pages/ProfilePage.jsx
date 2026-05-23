import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, uploadAvatar, fetchProfile } from '../redux/slices/authSlice';
import Avatar from '../components/ui/Avatar';
import Input  from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function ProfilePage() {
  const dispatch          = useDispatch();
  const { user, loading } = useSelector((s) => s.auth);
  const fileRef           = useRef();
  const [form,    setForm]    = useState({ name: '', email: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => { dispatch(fetchProfile()); }, [dispatch]);
  useEffect(() => { if (user) setForm({ name: user.name || '', email: user.email || '' }); }, [user]);

  const handleSave = async () => {
    const res = await dispatch(updateProfile({ name: form.name }));
    if (!res.error) setEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('avatar', file);
    dispatch(uploadAvatar(formData));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account settings</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <Avatar src={user?.avatar?.url} name={user?.name} size="lg" />
            <button onClick={() => fileRef.current.click()}
              className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-blue-700">
              ✎
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-gray-700">Personal Information</h2>
          {!editing && <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>Edit</Button>}
        </div>
        <div className="space-y-4">
          <Input label="Full Name" value={form.name} disabled={!editing}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" value={form.email} disabled className="bg-gray-50 cursor-not-allowed" />
        </div>
        {editing && (
          <div className="flex gap-3 mt-5">
            <Button onClick={handleSave} loading={loading}>Save Changes</Button>
            <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
          </div>
        )}
      </div>
    </div>
  );
}
