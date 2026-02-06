import React from 'react'

const Authors: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mualliflar</h1>
        <p className="text-muted-foreground">Barcha mualliflarni boshqarish</p>
      </div>
      
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Mualliflar sahifasi</h2>
        <p className="text-muted-foreground mb-4">
          Bu yerda mualliflarni qo'shish, tahrirlash va o'chirish mumkin bo'ladi
        </p>
        <p className="text-sm text-muted-foreground">
          Tez orada to'liq funksionallik qo'shiladi...
        </p>
      </div>
    </div>
  )
}

export default Authors
