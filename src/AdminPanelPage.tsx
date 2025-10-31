import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { api, clearAuthToken } from "./lib/api";
import type { DashboardMetrics, Event } from "./types/api";
import { toast } from "sonner@2.0.3";
import { LogOut, Calendar, Users, Mail, BarChart, Pencil } from "lucide-react";

const USER_STORAGE_KEY = "ieee_admin_user";

interface AdminUser {
  id: string;
  email: string;
  role: string;
}

export default function AdminPanelPage() {
  const STATUS_LABELS: Record<Event["status"], string> = {
    draft: "Taslak",
    published: "Yayında",
    archived: "Arşivlendi"
  };
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (!storedUser) {
      window.location.href = "/admin-login";
      return;
    }
    setUser(JSON.parse(storedUser));

    const fetchData = async () => {
      try {
        const [metricsResponse, eventsResponse] = await Promise.all([
          api.getAdminDashboard() as Promise<DashboardMetrics>,
          api.getAdminEvents() as Promise<Event[]>
        ]);
        setMetrics(metricsResponse);
        setEvents(eventsResponse);
      } catch (error) {
        toast.error("Yetkilendirme hatası. Tekrar giriş yapın.");
        console.error(error);
        clearAuthToken();
        localStorage.removeItem(USER_STORAGE_KEY);
        window.location.href = "/admin-login";
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await api.authLogout();
    } catch (error) {
      console.error(error);
    } finally {
      clearAuthToken();
      localStorage.removeItem(USER_STORAGE_KEY);
      window.location.href = "/admin-login";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Yükleniyor...
      </div>
    );
  }

  const statusLabel = (status: Event["status"]) => STATUS_LABELS[status] ?? status;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">IEEE ESTU Admin Panel</h1>
            <p className="text-sm text-slate-300">
              {user?.email} · {user?.role === "super" ? "Süper Admin" : "Editör"}
            </p>
          </div>
          <Button variant="ghost" className="text-white" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Çıkış Yap
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon={<Calendar className="h-5 w-5" />}
              label="Aktif Etkinlik"
              value={metrics.events}
            />
            <MetricCard
              icon={<Users className="h-5 w-5" />}
              label="Etkinlik Başvuruları"
              value={metrics.eventApplications}
            />
            <MetricCard
              icon={<Mail className="h-5 w-5" />}
              label="Bülten Aboneleri"
              value={metrics.newsletterSubscribers}
            />
            <MetricCard
              icon={<BarChart className="h-5 w-5" />}
              label="Sponsorluk Talepleri"
              value={metrics.sponsorshipLeads}
            />
          </div>
        )}

        <Card className="border border-slate-800 bg-slate-900">
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle>Etkinlikler</CardTitle>
            <Button
              className="ieee-button-primary"
              onClick={() => (window.location.href = "/admin/events/new")}
            >
              + Yeni Etkinlik Ekle
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-6 text-center text-slate-400">
                      Henüz etkinlik eklenmemiş.
                    </TableCell>
                  </TableRow>
                )}
                {events.map((event) => (
                  <TableRow key={event._id}>
                    <TableCell className="font-medium">
                      {event.translations.tr.title}
                    </TableCell>
                    <TableCell>
                      {event.startDate ? new Date(event.startDate).toLocaleDateString("tr-TR") : "-"}
                    </TableCell>
                    <TableCell>{statusLabel(event.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-700 text-white"
                        onClick={() => (window.location.href = `/admin/events/${event._id}/edit`)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Düzenle
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

function MetricCard({ icon, label, value }: MetricCardProps) {
  return (
    <Card className="border border-slate-800 bg-slate-900">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-300">{label}</p>
          <p className="text-2xl font-semibold mt-2">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-[var(--primary-color)]/20 text-[var(--primary-color)] flex items-center justify-center">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
