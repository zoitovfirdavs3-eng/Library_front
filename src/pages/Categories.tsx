import React from 'react'

const Categories: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Kategoriyalar</h1>
        <p className="text-muted-foreground">Barcha kategoriyalarni boshqarish</p>
      </div>
      
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Kategoriyalar sahifasi</h2>
        <p className="text-muted-foreground mb-4">
          Bu yerda kategoriyalarni qo'shish, tahrirlash va o'chirish mumkin bo'ladi
        </p>
        <p className="text-sm text-muted-foreground">
          Tez orada to'liq funksionallik qo'shiladi...
        </p>
      </div>
    </div>
  )
}

export default Categories
