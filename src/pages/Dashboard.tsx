import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Book, Users, Layout, TrendingUp } from 'lucide-react'

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Kutubxona statistikasi</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami Kitoblar</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">
              +12% o'tgan oydan beri
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mualliflar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              +5 yangi muallif
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kategoriyalar</CardTitle>
            <Layout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              +2 yangi kategoriya
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faol Foydalanuvchilar</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +19% o'tgan oydan beri
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>So'nggi qo'shilgan kitoblar</CardTitle>
            <CardDescription>
              Oxirgi 10 ta kitob
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                'Alchemist',
                '1984',
                'To Kill a Mockingbird',
                'The Great Gatsby',
                'Pride and Prejudice',
              ].map((book, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {book}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Muallif {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tizim haqida</CardTitle>
            <CardDescription>
              Kutubxona boshqaruv tizimi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Versiya</span>
                <span className="text-sm text-muted-foreground">1.0.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Oxirgi yangilanish</span>
                <span className="text-sm text-muted-foreground">Bugun</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database</span>
                <span className="text-sm text-muted-foreground">MongoDB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-600">Online</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
